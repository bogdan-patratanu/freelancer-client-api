import { Injectable } from '@nestjs/common';
import { Project } from 'src/database/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService  {
  constructor(
    @InjectRepository(Project) repo,
  ) {
  }
}
