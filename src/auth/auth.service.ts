import {HttpStatus, Injectable} from '@nestjs/common';
import {UserService} from "../core/database/services/user.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../core/database/dtos/create-user.dto";
import {AuthRegisterDto} from "./dtos/auth-register.dto";
import {AuthCredentialsDto} from "./dtos/auth-credentials.dto";
import {ResponseDto, ResponseStatus} from "../common/dtos/response.dto";
import {RoleService} from "../core/database/services/role.service";
import {RoleEntity} from "../core/database/entities/role.entity";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private roleService: RoleService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<Record<string, any>> {
        return await this.userService.validateUser(email, password);
    }
    async signUp(userData: AuthRegisterDto): Promise<Record<string, any>> {
        return await this.userService.insert(new CreateUserDto({
            email: userData.email,
            username: userData.username,
            password: userData.password,
        }))
    }
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string|false> {
        const user = await this.userService.findByUsernameOrEmail(authCredentialsDto.username, authCredentialsDto.email);
        if (!user) {
            return false;
        }
        const {password, ...sanctifyUser} = user;
        const payload = { ...sanctifyUser };
        return this.jwtService.sign(payload);
    }

    async assignRole(userId: number, roleId: number): Promise<ResponseDto> {
        const user = await this.userService.findOneById(userId);
        const response = new ResponseDto({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            status: ResponseStatus.FAILED,
            message: 'Internal server error!'
        });
        if (!user) {
            response.message = 'User not found';
            response.statusCode = HttpStatus.NOT_FOUND;
        }else {
            const existingRole = user.roles.find((role) => role.id === roleId);
            if (existingRole) {
                response.message = 'Role is already assigned to the user';
                response.statusCode = HttpStatus.FAILED_DEPENDENCY;
            } else {
                user.roles.push(<RoleEntity>{id: roleId});
                await this.userService.save(user);
                response.message = 'Successfully assign a role to the user.';
                response.statusCode = HttpStatus.ACCEPTED;
                response.status = ResponseStatus.SUCCESS;
            }
        }
        return response;
    }

    async revokeRole(userId: number, roleId: number): Promise<ResponseDto> {
        const user = await this.userService.findOneById(userId);
        const response = new ResponseDto({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            status: ResponseStatus.FAILED,
            message: 'Internal server error!'
        });
        if (!user) {
            response.message = 'User not found';
            response.statusCode = HttpStatus.NOT_FOUND;
        }else {
            const roleIndex = user.roles.findIndex((role) => role.id === roleId);
            if (roleIndex === -1) {
                response.message = 'Role is not assigned to the user';
                response.statusCode = HttpStatus.FAILED_DEPENDENCY;
            } else {
                user.roles.splice(roleIndex, 1);
                response.message = 'Successfully revoked role from user.';
                response.statusCode = HttpStatus.ACCEPTED;
                response.status = ResponseStatus.SUCCESS;
            }
        }
        return response;
    }
}
