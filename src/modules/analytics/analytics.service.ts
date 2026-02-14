import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Analytic } from '../../database/entities';
import { BaseService } from '../../common/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsService extends BaseService<Analytic> {
  constructor(
    @InjectRepository(Analytic)
    protected readonly repository: Repository<Analytic>
  ) {
    super(repository);
  }
}
