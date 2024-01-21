import { Module } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { TypeOrmModule } from "@nestjs/typeorm"
import { Restaurant } from "./entities/restaurants.entity";
import { RestaurantsController } from "./restaurants.controller";
import { CommonModule } from "src/common/common.module";


@Module({
    imports: [TypeOrmModule.forFeature([Restaurant]), CommonModule],
    providers: [RestaurantsService],
    controllers: [RestaurantsController],
    exports: []
})
export class RestaurantsModule {

}