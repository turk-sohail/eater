import { Controller, Get, Post, Body } from "@nestjs/common"
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { FindUserDto } from "./dto/find-user.dto";



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

}