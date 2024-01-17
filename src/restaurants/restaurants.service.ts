import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Restaurant } from "./entities/restaurants.entity";
import { Repository } from "typeorm";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";



@Injectable()
export class RestaurantsService {
    constructor(@InjectRepository(Restaurant) private readonly restaurants: Repository<Restaurant>) { }


    getAll(): Promise<Restaurant[]> {
        const restaturants = this.restaurants.find();
        return restaturants;
    }

    createRestaurant(body: CreateRestaurantDto) {
        const response = this.restaurants.create(body);
        this.restaurants.save(response);
        return response;
    }


}