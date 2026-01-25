import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../../database/entities';
import { BaseService } from '../../common/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService extends BaseService<Notification> {
  constructor(
    @InjectRepository(Notification)
    protected readonly repository: Repository<Notification>
  ) {
    super(repository);
  }
}
