import {
    IsString,
    MinLength,
    MaxLength,
    Matches,
    IsEmail,
    ValidateIf
} from '@nestjs/class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AuthLoginDto {
    @ApiProperty({
        description: 'Registered username',
        default: "test50",
        type: "string",
        minLength: 4,
        maxLength: 20
    })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ValidateIf((o: AuthLoginDto) => !o.email)
    username: string;

    @ApiProperty({
        description: 'Registered email id',
        default: "test50@gmail.com",
        type: "email",
        minLength: 8,
        maxLength: 20,
        nullable: true
    })
    @IsEmail()
    @ValidateIf((o: AuthLoginDto) => !o.username)
    email: string;

    @ApiProperty({
        description: 'Password of the user',
        default: "Idiot@420!!",
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
}
