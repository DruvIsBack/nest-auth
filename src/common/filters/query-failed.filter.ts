import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {ResponseDto, ResponseStatus} from "../dtos/response.dto";
import {ValidationException} from "../exceptions/validation.exception";

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
    catch(error: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = StatusCodes.INTERNAL_SERVER_ERROR;
        let message = 'An error occurred while processing your request.';
        let data = null;

        switch (error.driverError.code) {
            case 'ER_DUP_ENTRY':
                status = StatusCodes.CONFLICT;
                message = 'The record already exists in the database.';
                break;
            // add additional cases for other possible errors here
            default:
                break;
        }

        const responseDto = new ResponseDto({
            status: ResponseStatus.FAILED,
            statusCode: status,
            message: message,
            data: data,
        });

        if (error instanceof ValidationException) {
            return response
                .status(StatusCodes.EXPECTATION_FAILED)
                .send(error.getResponse());
        }

        return response.status(status).send(responseDto);
    }
}
