import { Controller } from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller({
    path: '/auth',
    version: '1',
})
export class AuthController {
    constructor(private authService: AuthService) {}
}
