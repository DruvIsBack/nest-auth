import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./database/entities/user.entity";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'manager',
        password: 'manager',
        database: 'nest_db_auth',
        synchronize: true,
        entities: [
          UserEntity
        ]
      }),
      DatabaseModule
  ]
})
export class CoreModule {}
