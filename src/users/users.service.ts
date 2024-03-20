import { HttpException, HttpStatus, Injectable, NotFoundException, } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./enteties/users.entity";
import { Repository } from "typeorm";
import { SuccessResponse, ErrorResponse } from "../common/Response";
import { JwtService } from "src/utils/jwt/jwt.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { Verification } from "./enteties/verification.entity";
import { MailService } from "src/mail/mail.service";



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectRepository(Verification) private readonly verificationRepository: Repository<Verification>,
        private jwtService: JwtService,
        private mailService: MailService
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
            await this.verificationRepository.save(this.verificationRepository.create({
                user
            }))
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
        try {

            const user = await this.usersRepository.findOneBy({ id });
            if (!user) {
                throw new NotFoundException("User does not found")
            }
            return user;
        } catch (error) {
            throw error;
        }

    }




    async updateUser(id: number, body: UpdateUserDto) {


        const user = await this.usersRepository.findOneBy({ id });
        let hash = "";
        if (body.password) {
            hash = await bcrypt.hash(body.password, 12);
            user.password = hash;
        }
        if (body.email) {
            user.email = body.email;
            user.verified = false;
        }
        await this.usersRepository.save(user);
        await this.verificationRepository.save(this.verificationRepository.create(
            { user }
        ))
        SuccessResponse.message = "Values updated Successfully";
        SuccessResponse.data = user;
        return SuccessResponse;

    }


    async verifyEmail(code: string): Promise<boolean> {
        try {
            const verification = await this.verificationRepository.findOne({
                where: {
                    code
                },
                relations: ["user"]
            })
            if (verification) {

                verification.user.verified = true;
                this.usersRepository.save(verification.user);

                console.log(verification);

            }
            return true
        } catch (error) {

        }
    }

    async sendEmail() {
        return await this.mailService.sendEmail();
    }

}