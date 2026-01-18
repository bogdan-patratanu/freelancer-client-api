import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { CommandsModule } from './commands/commands.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/data-source';
import { TasksService } from './services/tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { BlablaHandler } from './services/handlers/blabla.service';
import { FreelancerService } from './services/freelancer.service';
import { HttpModule } from '@nestjs/axios';
import { ProjectsSearchHandler } from './services/handlers/projectsSearch.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    CommandsModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService, FreelancerService, BlablaHandler, ProjectsSearchHandler],
})
export class AppModule {}
