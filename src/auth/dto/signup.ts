import {IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class SignupDto {
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    password: string;

    @IsString()
    dob: string;

    @IsOptional()
    photo: string;
}