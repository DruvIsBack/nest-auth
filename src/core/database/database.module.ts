import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserEntity} from "./entities/user.entity";
import {UserService} from "./services/user.service";
import {RoleService} from "./services/role.service";
import {RoleEntity} from "./entities/role.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity, RoleEntity
        ])
    ],
    providers: [RoleService, UserService],
    exports: [TypeOrmModule, UserService, RoleService]
})
export class DatabaseModule {}
