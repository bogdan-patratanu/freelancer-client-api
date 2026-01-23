import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { AppService } from './app.service';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { BlablaHandler } from './handlers/blabla.service';
import { ProjectsSearchHandler } from './handlers/projectsSearch.service';
import { ProjectUpdateHandler } from './handlers/projectUpdate.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly appService: AppService,
    private readonly blablaHandler: BlablaHandler,
    private readonly projectsSearchHandler: ProjectsSearchHandler,
    private readonly projectUpdateHandler: ProjectUpdateHandler,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  // @Timeout(1000)
  async processTasks() {
    const checkProcessing = await this.entityManager.getRepository('Task').findOne({
      where: {
        status: 'processing',
        processed: 0,
      },
    });

    if (checkProcessing) {
      this.appService.getAppLogger().log('Worker is running');
      return;
    }

    const task = await this.entityManager.getRepository('Task').findOne({
      where: {
        status: 'new',
        processed: 0,
      },
      order: {
        id: 'ASC',
      },
    });

    if (!task) {
      return;
    }

    task.status = 'processing';
    task.startProcessingTime = new Date();
    await this.entityManager.getRepository('Task').save(task);

    this.appService.getAppLogger().log(`Processing task with id = ${task.id}`);

    let result: any;
    if (task.handler === 'blabla') {
      result = await this.blablaHandler.handle(task.payload);
      task.status = 'completed';
    } else if (task.handler === 'projectsSearch') {
      result = await this.projectsSearchHandler.handle(task.payload);
      task.status = 'completed';
    } else if (task.handler === 'projectUpdate') {
      result = await this.projectUpdateHandler.handle(task.payload);
      task.status = 'completed';
    } else {
      result = 'Handler not found';
      task.status = 'failed';
    }

    task.processed = 1;
    task.endProcessingTime = new Date();
    task.result = result;
    await this.entityManager.getRepository('Task').save(task);
  }

  @Cron(CronExpression.EVERY_HOUR)
  // @Timeout(1000)
  async getNewProjects() {
    await this.appService.getNewProjects();
  }
}
