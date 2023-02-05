import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodes } from '../constants/error-codes.enum';

export class ValidationException extends HttpException {
    constructor(errors: any) {
        super({ success: false, code: ErrorCodes.ERR_VALIDATION, errors }, HttpStatus.BAD_REQUEST);
    }
}