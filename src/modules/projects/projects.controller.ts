import { Controller, Get, Query } from '@nestjs/common';
import { Project } from '../../database/entities';
import { ProjectsService } from './projects.service';
import { BaseCrudController } from '../../common/base-crud.controller';

@Controller('projects')
export class ProjectsController extends BaseCrudController<Project> {
  constructor(protected readonly service: ProjectsService) {
    super(service);
  }

  @Get()
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    // Set default values if not provided
    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    console.log('pageNumber', pageNumber);
    console.log('limitNumber', limitNumber);

    // console.log('now', new Date().toISOString());
    return this.service.findAllPaginated(pageNumber, limitNumber);
  }
}
