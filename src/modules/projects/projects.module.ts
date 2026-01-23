import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "src/database/entities";


@Module({
    controllers: [],
    providers: [],
    exports: [],
    imports: [
        TypeOrmModule.forFeature([Project])
    ]
})
export class ProjectsModule {
}