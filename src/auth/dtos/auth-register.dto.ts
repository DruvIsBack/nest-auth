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

export class AuthRegisterDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ValidateIf((o: AuthRegisterDto) => !o.email)
    username: string;

    @IsEmail()
    @ValidateIf((o: AuthRegisterDto) => !o.username)
    email: string;

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
