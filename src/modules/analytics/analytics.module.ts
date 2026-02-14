import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnalyticsController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";
import { AppService } from "../../services/app.service";
import { Analytic } from "../../database/entities";

@Module({
    controllers: [AnalyticsController],
    providers: [AnalyticsService, AppService],
    exports: [AnalyticsService],
    imports: [
        TypeOrmModule.forFeature([Analytic]),
        
    ]
})
export class AnalyticsModule {
}