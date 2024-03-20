import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from "joi";
import { RouterModule } from '@nestjs/core';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';
import { User } from './users/enteties/users.entity';
import { JwtModule } from './utils/jwt/jwt.module';
import { JwtMiddlware } from './middlewares/jwt.middleware';
import { Verification } from './users/enteties/verification.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';


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
                JWT_SECRET: Joi.string().required()
            })
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: 'eater',
            entities: [User, Verification],
            synchronize: true,
            logging: false
        }),
        RouterModule.register(
            [
                {
                    path: "restaurants",
                    module: RestaurantsModule
                },
                {
                    path: "users",
                    module: UsersModule
                }
            ]
        ),
        MailerModule.forRoot({
            transport: {
                host: 'smtp.ethereal.email',
                port: 587,
                ignoreTLS: false,
                secure: false,
                auth: {
                    user: 'trudie.hirthe85@ethereal.email',
                    pass: 'z1QxKNkYQnJ4e8Wb4u'
                }
            }
        })
        , RestaurantsModule,
        MailModule,
        UsersModule,
        JwtModule.forRoot({ JWT_SECRET: process.env.JWT_SECRET }),

    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddlware).forRoutes({
            path: "*",
            method: RequestMethod.ALL
        })
    }
}
