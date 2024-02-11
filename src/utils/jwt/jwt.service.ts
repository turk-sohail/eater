import { Inject, Injectable } from "@nestjs/common"
import { CONFIG_OPTIONS } from "./jwt.constants";
import { JwtOptionsInterface } from "./jwt-options.interface";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtService {
    constructor(@Inject(CONFIG_OPTIONS) private readonly options: JwtOptionsInterface) { }
    sign(payload: object): string {
        return jwt.sign(payload, this.options.JWT_SECRET);
    }

    verify(token: string) {
        return jwt.verify(token, this.options.JWT_SECRET);
    }
}
