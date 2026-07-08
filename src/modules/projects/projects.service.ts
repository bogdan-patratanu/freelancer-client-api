import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../../database/entities';
import { BaseService } from '../../common/base.service';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ProjectsService extends BaseService<Project> {
  constructor(
    @InjectRepository(Project)
    protected readonly repository: Repository<Project>
  ) {
    super(repository);
  }

  async searchPaginated(search: string | undefined, page = 1, limit = 25, order: any = { id: 'DESC' }) {
    const skip = (page - 1) * limit;
    let where: any = {};

    if (search?.trim()) {
      const term = search.trim();
      where = [{ title: Like(`%${term}%`) }, { description: Like(`%${term}%`) }];
      if (/^\d+$/.test(term)) {
        where.push({ id: parseInt(term, 10) });
      }
    }

    const [data, total] = await this.repository.findAndCount({
      where,
      skip,
      take: limit,
      order,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
