import { Controller } from '@nestjs/common';
// import { Crud, CrudController } from '@nestjsx/crud';
import { Project } from 'src/database/entities';
import { ProjectsService } from './projects.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Controller('projects')
// @UseGuards(new PermissionCheck('ff'))
export class ProjectsController  {
  constructor(
    public service: ProjectsService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  // get base(): CrudController<Project> {
  //   return this;
  // }
}
