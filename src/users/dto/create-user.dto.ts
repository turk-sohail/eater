import { IsEmail, IsEmpty } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email: string

    password: string

    role: string
}