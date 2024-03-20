import { BeforeInsert, CreateDateColumn, UpdateDateColumn, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";
import { v4 as uuidv4 } from 'uuid';


@Entity()
export class Verification {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    createCode(): void {
        this.code = uuidv4();
    }

    @OneToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn()
    user: User

}