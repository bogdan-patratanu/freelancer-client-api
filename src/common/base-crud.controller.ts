import { Get, Post, Put, Delete, Patch, Body, Param, Query } from '@nestjs/common';

export abstract class BaseCrudController<T> {
  constructor(protected readonly service: any) {}

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    // Set default values if not provided
    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    
    return this.service.findAll(pageNumber, limitNumber);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<T>) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<T>) {
    return this.service.update(id, data);
  }

  @Patch(':id')
  async partialUpdate(@Param('id') id: number, @Body() data: Partial<T>) {
    return this.service.partialUpdate(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
