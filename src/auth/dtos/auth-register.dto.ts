import {
    IsString,
    MinLength,
    MaxLength,
    Matches,
    IsEmail,
    ValidateIf,
    ArrayNotEmpty,
    ArrayUnique
} from '@nestjs/class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AuthRegisterDto {
    @ApiProperty({
        description: 'Username',
        default: "test50",
        type: "string",
        minLength: 4,
        maxLength: 20
    })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ValidateIf((o: AuthRegisterDto) => !o.email)
    username: string;

    @ApiProperty({
        description: 'Email id',
        default: "test50@gmail.com",
        type: "email",
        minLength: 8,
        maxLength: 20,
        nullable: true
    })
    @IsEmail()
    @IsEmail()
    @ValidateIf((o: AuthRegisterDto) => !o.username)
    email: string;

    @ApiProperty({
        description: 'Password',
        default: "Pass@321!!",
        minLength: 8,
        maxLength: 20
    })
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'password too weak' },
    )
    password: string;

    @IsString({ each: true })
    @ArrayNotEmpty()
    @ArrayUnique()
    roles: string[];
}
