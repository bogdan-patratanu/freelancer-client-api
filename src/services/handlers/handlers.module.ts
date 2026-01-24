import { Module } from '@nestjs/common';
import { AppService } from '../app.service';
import { FreelancerService } from '../freelancer.service';
import { BlablaHandler } from './blabla.service';
import { ProjectsSearchHandler } from './projectsSearch.service';
import { ProjectUpdateHandler } from './projectUpdate.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    AppService,
    FreelancerService,
    BlablaHandler,
    ProjectsSearchHandler,
    ProjectUpdateHandler,
  ],
  exports: [BlablaHandler, ProjectsSearchHandler, ProjectUpdateHandler],
})
export class HandlersModule {}
