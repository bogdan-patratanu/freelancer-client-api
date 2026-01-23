import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

export interface IBaseEntity {
  id: number;
}

@Injectable()
export abstract class BaseService<T extends IBaseEntity> {
  constructor(
    protected readonly repository: Repository<T>
  ) {}

  async create(createDto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findAllPaginated(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.repository.findAndCount({
      skip,
      take: limit,
      order: { id: 'DESC' } as any,
    });
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<T> {
    return this.repository.findOneBy({ id } as any);
  }

  async update(id: number, updateDto: DeepPartial<T>): Promise<T> {
    const entity = await this.findOne(id);
    if (!entity) {
      throw new Error(`Entity with id ${id} not found`);
    }
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
