import { Injectable } from '@nestjs/common';
import {UserService} from "../core/database/services/user.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../core/database/dtos/create-user.dto";
import {UserEntity} from "../core/database/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}
    async signUp(userData: { username: string, email: string, password: string }): Promise<UserEntity> {
        return await this.userService.createUser(new CreateUserDto(userData));
    }
}
