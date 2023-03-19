import {
    ArrayNotEmpty, ArrayUnique,
    IsEmail,
    IsString,
    MaxLength,
    MinLength,
    ValidationError,
    ValidatorOptions,
} from "@nestjs/class-validator";
import {validate} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly username: string;
    @IsEmail()
    readonly email: string;
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly password: string;

    @IsString({ each: true })
    @ArrayNotEmpty()
    @ArrayUnique()
    readonly roles: string[];

    constructor(data: { username: string, email: string, password: string, roles: string[] }) {
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.roles = data.roles;
    }

    async validate(options?:ValidatorOptions): Promise<ValidationError[]>{
        return await validate(this, options);
    }
}