import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    isVegan: boolean

    @Column()
    address: string

    @Column()
    ownersName: string

    @Column()
    category: string






}