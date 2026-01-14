import { Module } from '@nestjs/common';
import { GetProjectsCommand, GetSkillsCommand } from './commands.service';
import { FreelancerService } from '../services/freelancer.service';
import { HttpModule } from '@nestjs/axios';
import { AppService } from '../services/app.service';

@Module({
  imports: [HttpModule],
  providers: [AppService, FreelancerService, GetSkillsCommand, GetProjectsCommand],
  exports: [],
})
export class CommandsModule {}
