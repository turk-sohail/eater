import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./enteties/users.entity";
import { Repository } from "typeorm";
import { SuccessResponse, ErrorResponse } from "../common/Response";
import { JwtService } from "src/utils/jwt/jwt.service";


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
        private jwtService: JwtService
    ) {

    }

    async createUser({ email, password, role }) {
        try {
            const existedUser = await this.usersRepository.findOneBy({ email });
            if (existedUser) {
                throw new HttpException("User with this name already exist", HttpStatus.CONFLICT);
            }

            const user = this.usersRepository.create({ email, password, role });
            await this.usersRepository.save(user);
            SuccessResponse.data = user;
            return SuccessResponse;



        } catch (error) {
            console.log(error)
            throw new HttpException("Could not create user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async login({ email, password }) {
        try {
            const user = await this.usersRepository.findOneBy({ email });
            if (!user) {
                return { status: HttpStatus.NOT_FOUND, message: "user not found" }
            }

            const isValid = (await user).checkPassword(password);
            if (!isValid) {
                ErrorResponse.message = "Wrong password"
                return ErrorResponse;
            }
            const token = await this.jwtService.sign({ userid: user.id });
            SuccessResponse.data = user;
            SuccessResponse.token = token;
            return SuccessResponse;
        } catch (error) {
            ErrorResponse.data = error;
            return ErrorResponse;
        }



    }
    async findOne(id: any) {
        const user = await this.usersRepository.findOneBy({ id });
        return user;
    }

}