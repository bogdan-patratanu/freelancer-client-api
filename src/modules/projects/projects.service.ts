import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../../database/entities';
import { BaseService } from '../../common/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService extends BaseService<Project> {
  constructor(
    @InjectRepository(Project)
    protected readonly repository: Repository<Project>
  ) {
    super(repository);
  }
}
