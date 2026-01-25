import { Controller, Get } from '@nestjs/common';
import { AppService } from './services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    return 'Sooo ... cu ce ocazie pe aici ?';
  }

  @Get('count-tasks')
  async countTasks(): Promise<any> {
    return {count: await this.appService.countTasks()};
  }
}
