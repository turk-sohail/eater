import { Controller, Get, Post, Body } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";



@Controller()
export class RestaurantsController {

    constructor(private restaurantsService: RestaurantsService) {

    }

    @Get()
    async allRestaurants() {
        return await this.restaurantsService.getAll();
    }

    @Post()
    createRestaurant(@Body() body: CreateRestaurantDto) {
        return this.restaurantsService.createRestaurant(body);
    }

}