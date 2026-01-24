import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { CommandsModule } from './commands/commands.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/data-source';
import { TasksService } from './services/tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { FreelancerService } from './services/freelancer.service';
import { HttpModule } from '@nestjs/axios';
import { ProjectsModule } from './modules/projects/projects.module';
import { HandlersModule } from './services/handlers/handlers.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    CommandsModule,
    HttpModule,
    HandlersModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService, FreelancerService],
})
export class AppModule {}
