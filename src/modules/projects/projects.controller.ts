import { Controller, Get, Param, Post, Query } from '@nestjs/common';
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
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('endingSoon') endingSoon?: string,
  ) {
    let result;

    if (endingSoon === 'true') {
      // Unchanged legacy behavior for the "ending soon" page: active projects
      // ending within the next 24h, capped at 1000, ordered by submitDate ASC.
      const pageNumber = page || 1;
      const filters = {
        status: 'active',
        endDate: Between(new Date(Date.now()).toISOString(), new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()),
      };
      result = await this.service.findAllPaginated(filters, pageNumber, 1000, { submitDate: 'ASC' });
    } else {
      result = await this.service.searchPaginated(search, page || 1, limit || 25, { id: 'DESC' });
    }

    for (const project of result.data) {
      const { displayType, ownerCountryName } = await this.appService.getProjectDisplayType(project);
      project['displayType'] = displayType;
      project['ownerCountryName'] = ownerCountryName;
    }
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const project = await this.service.findOne(id);
    if (project) {
      const { displayType, ownerCountryName } = await this.appService.getProjectDisplayType(project);
      project['displayType'] = displayType;
      project['ownerCountryName'] = ownerCountryName;
    }
    return project;
  }

  @Post('update-projects')
  async updateProjects() {
    this.appService.updateProjects();
    return { message: 'This endpoint is for updating projects' };
  }
}
