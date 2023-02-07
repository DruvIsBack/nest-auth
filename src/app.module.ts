import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {JwtModule} from "@nestjs/jwt";
import {DatabaseModule} from "./core/database/database.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'manager',
          password: 'manager',
          database: 'nest_db_auth',
          synchronize: true
      }),
      JwtModule,
      DatabaseModule,
      AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
