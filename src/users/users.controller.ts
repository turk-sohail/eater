import { Controller, Post, Body, Get, Param, Patch } from "@nestjs/common"
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { FindUserDto } from "./dto/find-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";


@Controller()
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post("/signup")
    async createUser(@Body() body: CreateUserDto) {

        const user = await this.userService.createUser(body);
        return user;


    }

    @Post("/login")
    async login(@Body() body: FindUserDto) {
        const user = await this.userService.login(body);
        return user;
    }

    @Get("/:id")
    async getUser(@Param("id") id: number) {
        const user = await this.userService.findOne(id);
        return user;

    }

    @Patch("/:id")
    async updateUser(@Body() body: UpdateUserDto, @Param("id") id: string) {
        return this.userService.updateUser(parseInt(id), body);
    }

    @Post("/verify")
    async verifyEmail(@Body() body: VerifyEmailDto) {
        return this.userService.verifyEmail(body.code);
    }

    @Get("/bb/send-email")
    async sendEmail() {
        return this.userService.sendEmail();
    }

}