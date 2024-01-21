import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsString, IsBoolean, IsOptional } from "class-validator"



@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @Column()
    name: string


    @IsBoolean()
    @IsOptional()
    @Column()
    isVegan: boolean

    @IsString()
    @Column()
    address: string

    @IsString()
    @Column()
    ownersName: string

    @IsString()
    @Column()
    category: string






}