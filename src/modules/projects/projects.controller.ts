import { Controller, Get, Post, Query } from '@nestjs/common';
import { Between } from 'typeorm';
import { Project } from '../../database/entities';
import { ProjectsService } from './projects.service';
import { BaseCrudController } from '../../common/base-crud.controller';
import { AppService } from '../../services/app.service';

@Controller('projects')
export class ProjectsController extends BaseCrudController<Project> {
  constructor(
    protected readonly service: ProjectsService,
    protected readonly appService: AppService
  ) {
    super(service);
  }

  @Get()
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    // Set default values if not provided
    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    // console.log('pageNumber', pageNumber);
    // console.log('limitNumber', limitNumber);

    
    // console.log('now', new Date().toISOString());

    const filters = {
      status: 'active',
      endDate: Between(new Date(Date.now()).toISOString(), new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()),
    };
    // console.log('filters', filters);
    const result = await this.service.findAllPaginated(filters, pageNumber, 1000, {submitDate: 'ASC'});
    for (const project of result.data) {
      const { displayType, ownerCountry, ownerCountryName } = await this.appService.getProjectDisplayType(project);
      project['displayType'] = displayType;
      project['ownerCountryName'] = ownerCountryName;
    }
    return result;
  }

  @Post('update-projects')
  async updateProjects() {
    this.appService.updateProjects();
    return { message: 'This endpoint is for updating projects' };
  }
}
