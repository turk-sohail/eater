import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from "joi";
import { Restaurant } from './restaurants/entities/restaurants.entity';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
            ignoreEnvFile: process.env.NODE_ENV === '.env.prod',
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid("dev", "prod").required(),
                DB_HOST: Joi.string().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PORT: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),


            })
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: 'eater',
            entities: [Restaurant],
            synchronize: true,
            logging: true
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})


export class AppModule {
}