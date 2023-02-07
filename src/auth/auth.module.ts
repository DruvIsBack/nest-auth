import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserService} from "../core/database/services/user.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: 'something_hidden',
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService]
})
export class AuthModule {}
