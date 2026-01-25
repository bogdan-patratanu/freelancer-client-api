import { Controller, Get, Post, Query } from '@nestjs/common';
import { Project } from '../../database/entities';
import { NotificationsService } from './notifications.service';
import { BaseCrudController } from '../../common/base-crud.controller';
import { AppService } from '../../services/app.service';

@Controller('notifications')
export class NotificationsController extends BaseCrudController<Project> {
  constructor(
    protected readonly service: NotificationsService,
    protected readonly appService: AppService,
  ) {
    super(service);
  }

  @Get()
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    const result = await this.service.findAllPaginated({}, page, limit, { id: 'DESC' });

    return result;
  }
}
