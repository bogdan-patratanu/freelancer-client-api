import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "../../database/entities";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";
import { AppService } from "../../services/app.service";


@Module({
    controllers: [ProjectsController],
    providers: [ProjectsService, AppService],
    exports: [ProjectsService],
    imports: [
        TypeOrmModule.forFeature([Project]),
        
    ]
})
export class ProjectsModule {
}