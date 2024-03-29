import { Module, DynamicModule, Global } from "@nestjs/common"
import { JwtService } from "./jwt.service"
import { JwtOptionsInterface } from "./jwt-options.interface"
import { CONFIG_OPTIONS } from "./jwt.constants"


@Module({})
@Global()
export class JwtModule {
    static forRoot(options: JwtOptionsInterface): DynamicModule {
        return {
            module: JwtModule,
            exports: [JwtService],
            providers: [{
                provide: CONFIG_OPTIONS,
                useValue: options
            }, JwtService]
        }
    }
}

