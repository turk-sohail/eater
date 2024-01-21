import { Controller, Get, Post, Body, Param, Put } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";



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

    @Put("/:id")
    updateRestaurant(@Body() body: UpdateRestaurantDto, @Param("id") id: number) {
        return this.restaurantsService.updateRestaurant(id, body)
    }

    @Get("/:id")
    findOne(@Param("id") id: number) {
        return this.restaurantsService.findOneRestaurant(id);
    }

}