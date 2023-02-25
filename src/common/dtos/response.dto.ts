import { IsString, IsEnum } from '@nestjs/class-validator';
import { Exclude } from "@nestjs/class-transformer";
import { StatusCodes } from 'http-status-codes';

export enum ResponseStatus {
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED'
}

export class ResponseDto {
    constructor(partial?: Partial<ResponseDto>) {
        if (partial) Object.assign(this, partial);
    }

    data: any;

    @IsString()
    message: string;

    @IsEnum(ResponseStatus)
    status: ResponseStatus;

    @Exclude()
    @IsEnum(StatusCodes)
    statusCode: number;
}

