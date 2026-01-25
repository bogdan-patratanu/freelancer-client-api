import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "../../database/entities";
import { NotificationsController } from "./notifications.controller";
import { NotificationsService } from "./notifications.service";
import { AppService } from "../../services/app.service";


@Module({
    controllers: [NotificationsController],
    providers: [NotificationsService, AppService],
    exports: [NotificationsService],
    imports: [
        TypeOrmModule.forFeature([Notification]),
        
    ]
})
export class NotificationsModule {
}