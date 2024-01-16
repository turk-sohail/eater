import { Module } from "@nestjs/common";
import { RestaurantService } from "./restaturants.service";
import { TypeOrmModule } from "@nestjs/typeorm"
import { Restaurant } from "./entities/restaurants.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Restaurant])],
    providers: [RestaurantService],
    exports: []
})
export class RestaurantsModule {

}