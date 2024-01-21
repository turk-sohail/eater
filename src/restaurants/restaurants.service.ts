import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Restaurant } from "./entities/restaurants.entity";
import { Repository } from "typeorm";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";



@Injectable()
export class RestaurantsService {
    constructor(@InjectRepository(Restaurant) private readonly restaurants: Repository<Restaurant>) { }


    getAll(): Promise<Restaurant[]> {
        const restaturants = this.restaurants.find();
        return restaturants;
    }

    async createRestaurant(body: CreateRestaurantDto) {
        const response = this.restaurants.create(body);
        await this.restaurants.save(response);
        return response;
    }

    async updateRestaurant(id: number, body: UpdateRestaurantDto) {
        const response = await this.restaurants.findOneBy({ id });
        const update = { ...response, ...body };
        await this.restaurants.save(update);
        return update;
    }


    async findOneRestaurant(id: number) {
        const response = await this.restaurants.findOneBy({ id });
        return response;
    }


}