import {IsString, MinLength, MaxLength, Matches, IsEmail, ValidateIf} from '@nestjs/class-validator';

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ValidateIf((o: AuthCredentialsDto) => !o.email)
    username: string;

    @IsEmail()
    @ValidateIf((o: AuthCredentialsDto) => !o.username)
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'password too weak' },
    )
    password: string;
}
