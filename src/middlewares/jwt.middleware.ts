import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { UsersService } from "src/users/users.service";
import { JwtService } from "src/utils/jwt/jwt.service";


@Injectable()
export class JwtMiddlware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService,
        private userService: UsersService
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        if (req.headers["authorization"]) {
            const token = req.headers["authorization"].split(" ")[1];
            const decoded = this.jwtService.verify(token);
            const id = decoded["userid"];
            try {
                const user = await this.userService.findOne(id);
                req["user"] = user;
            } catch (error) {

            }

            //return user;

        }
        next()
    }
}