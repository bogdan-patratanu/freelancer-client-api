import { Controller, Get, Post, Query } from '@nestjs/common';
import { Analytic } from '../../database/entities';
import { AnalyticsService } from './analytics.service';
import { BaseCrudController } from '../../common/base-crud.controller';
import { AppService } from '../../services/app.service';

@Controller('analytics')
export class AnalyticsController extends BaseCrudController<Analytic> {
  constructor(
    protected readonly service: AnalyticsService,
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
