import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, IsStrongPassword } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsEmail()  
    email!: string;
    
    @IsStrongPassword({minLength: 8, minLowercase: 2, minUppercase: 2, minNumbers: 2, minSymbols: 2})
    password!: string;
}