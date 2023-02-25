import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import {JwtModule} from "@nestjs/jwt";
import {UserEntity} from "./database/entities/user.entity";
import {RoleEntity} from "./database/entities/role.entity";

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
            entities: [UserEntity, RoleEntity]
        }),
        JwtModule.register({
            secret: 'your-secret-key',
            signOptions: { expiresIn: '60s' },
        }),
        DatabaseModule
    ],
    exports: [
        JwtModule, DatabaseModule
    ],
})
export class CoreModule {}