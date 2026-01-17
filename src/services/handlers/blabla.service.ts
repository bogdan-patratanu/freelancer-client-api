import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class BlablaHandler {
  constructor(
    private readonly appService: AppService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async handle(payload: any) {

    // const freelancerService: FreelancerService = this.moduleRef.get(FreelancerService);
    // console.log(await freelancerService.getTest());

    // Use entityManager safely here
    // this.logger.log('Writing payload to app.log', payload);

    return 'Success';
    
  }
}
