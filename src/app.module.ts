import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        PG_HOST: Joi.required(),
        PG_USERNAME: Joi.required(),
        PG_PASSWORD: Joi.required(),
        PG_DATABASE: Joi.required(),
        PG_PORT: Joi.number().default(5432),
        NESTJS_PORT: Joi.number().default(5031),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      autoLoadEntities: true,
      synchronize: process.env.PG_CHANGE === 'true',
    }),
    CompanyModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
