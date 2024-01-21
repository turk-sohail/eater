//import { Bcrypt } from "src/common/Bcrypt";
import { InternalServerErrorException } from "@nestjs/common"
import { BeforeInsert, Column, Entity, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { IsEmail, IsEnum } from "class-validator";

enum UserRole {
    Client = "Client",
    Owner = "Owner",
    Delivery = "Delivery"
}
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @CreateDateColumn()
    updatedAt: Date


    @Column()
    @IsEmail()
    email: string

    @Column()
    password: string

    @Column({ type: "enum", enum: UserRole })
    @IsEnum(UserRole)
    role: UserRole


    @BeforeInsert()
    async hashPassword(): Promise<void> {
        try {
            this.password = await bcrypt.hash(this.password, 12);
            console.log(this.password)
        } catch (error) {
            throw Error(error)
        }

    }

    async checkPassword(pass: string) {
        try {
            const isValid = await bcrypt.compare(pass, this.password);
            return isValid;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}