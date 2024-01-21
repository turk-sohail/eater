import { IsOptional } from "class-validator"

export class UpdateRestaurantDto {

    @IsOptional()
    name: string;

    @IsOptional()
    isVegan: boolean;

    @IsOptional()
    address: string;

    @IsOptional()
    ownersName: string;

    @IsOptional()
    category: string;
}