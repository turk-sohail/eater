import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./enteties/users.entity";
import { Repository } from "typeorm";
import { SuccessResponse, ErrorResponse } from "../common/Response";


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }

    async createUser({ email, password, role }) {
        try {
            const existedUser = await this.usersRepository.findOneBy({ email });
            if (existedUser) {
                throw new HttpException("User with this name already exist", HttpStatus.CONFLICT);
            }

            const user = await this.usersRepository.create({ email, password, role });
            console.log(user);
            await this.usersRepository.save(user);
            console.log(user)
            return user;



        } catch (error) {
            console.log(error)
            throw new HttpException("Could not create user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async login({ email, password }) {
        try {
            const user = await this.usersRepository.findOneBy({ email });
            if (!user) {
                return { message: "user not found" }
            }

            const isValid = (await user).checkPassword(password);
            if (!isValid) {
                ErrorResponse.message = "Wrong password"
                return ErrorResponse;
            }
            SuccessResponse.data = user;
            console.log(user);
            return SuccessResponse;
        } catch (error) {
            ErrorResponse.data = error;
            return ErrorResponse;
        }


    }


}