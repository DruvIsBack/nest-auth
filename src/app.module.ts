import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from "./core/core.module";
import {APP_FILTER} from "@nestjs/core";
import {QueryFailedFilter} from "./common/filters/query-failed.filter";

@Module({
    imports: [
        CoreModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: QueryFailedFilter,
        },
    ],
})
export class AppModule {}
