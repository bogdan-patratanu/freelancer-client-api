import { Module } from '@nestjs/common';
import { GetNewProjectsCommand, GetSkillsCommand, UpdateProjectsCommand } from './commands.service';
import { FreelancerService } from '../services/freelancer.service';
import { HttpModule } from '@nestjs/axios';
import { AppService } from '../services/app.service';

@Module({
  imports: [HttpModule],
  providers: [AppService, FreelancerService, GetSkillsCommand, GetNewProjectsCommand, UpdateProjectsCommand],
  exports: [],
})
export class CommandsModule {}
