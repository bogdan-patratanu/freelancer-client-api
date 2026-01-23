import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "../../database/entities";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";


@Module({
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService],
    imports: [
        TypeOrmModule.forFeature([Project])
    ]
})
export class ProjectsModule {
}