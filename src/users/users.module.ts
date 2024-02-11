import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './enteties/users.entity';
import { CommonModule } from 'src/common/common.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';


@Module({
    imports: [TypeOrmModule.forFeature([User]), CommonModule],
    exports: [UsersService],
    providers: [UsersService],
    controllers: [UsersController]

})
export class UsersModule {
    constructor() { }
}
