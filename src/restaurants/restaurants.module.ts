import { Module } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { TypeOrmModule } from "@nestjs/typeorm"
import { Restaurant } from "./entities/restaurants.entity";
import { RestaurantsController } from "./restaurants.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Restaurant])],
    providers: [RestaurantsService],
    controllers: [RestaurantsController],
    exports: []
})
export class RestaurantsModule {

}