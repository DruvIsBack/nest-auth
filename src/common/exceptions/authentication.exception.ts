import { ForbiddenException, HttpStatus } from '@nestjs/common';
import { ErrorCodes } from '../constants/error-codes.enum';

export class AuthenticationException extends ForbiddenException {
    constructor(errors: any) {
        super({ success: false, code: ErrorCodes.ERR_VALIDATION, errors });
    }
}