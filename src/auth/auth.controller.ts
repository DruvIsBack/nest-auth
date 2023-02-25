import {Body, Controller, Post, Res, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthRegisterDto} from "./dtos/auth-register.dto";
import {ResponseDto, ResponseStatus} from "../common/dtos/response.dto";
import {StatusCodes} from "http-status-codes";
import {AuthLoginDto} from "./dtos/auth-login.dto";

@Controller({
    path: '/auth',
    version: '1',
})
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async register(
        @Body(ValidationPipe) authCredentialsDto: AuthRegisterDto,
        @Res() res
    ): Promise<ResponseDto> {
        let response = new ResponseDto({
            data: null,
            status: ResponseStatus.SUCCESS,
            statusCode: StatusCodes.CREATED,
            message: 'User registered successfully.'
        });
            const user = await this.authService.signUp(authCredentialsDto);
            if (user) {
                response = new ResponseDto({
                    data: user,
                    status: ResponseStatus.SUCCESS,
                    statusCode: StatusCodes.CREATED,
                    message: 'User registered successfully.'
                });
            }
        return res.status(response.statusCode).send(response);
    }

    @Post('/signin')
    async login(
        @Body(ValidationPipe) authCredentialsDto: AuthLoginDto,
        @Res() res
    ): Promise<ResponseDto> {
        let response = new ResponseDto({
            data: null,
            status: ResponseStatus.SUCCESS,
            statusCode: StatusCodes.OK,
            message: 'User authenticated successfully.'
        });
        const user = await this.authService.signIn(authCredentialsDto);
        if (user) {
            response = new ResponseDto({
                data: user,
                status: ResponseStatus.SUCCESS,
                statusCode: StatusCodes.OK,
                message: 'User authenticated successfully.'
            });
        } else {
            response.status = ResponseStatus.FAILED;
            response.statusCode = StatusCodes.UNAUTHORIZED;
            response.message = 'Invalid username or password.';
        }
        return res.status(response.statusCode).send(response);
    }
}
