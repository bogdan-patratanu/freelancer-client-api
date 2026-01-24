import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { FreelancerService } from '../freelancer.service';

@Injectable()
export class ProjectUpdateHandler {
  constructor(
    private readonly appService: AppService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly freelancerService: FreelancerService,
  ) {}

  async handle(payload: any) {
    const params = {
      projects: payload,
      full_description: true,
      job_details: true,
      local_details: true,
      location_details: true,
      upgrade_details: true,
      owner_info: true,
      selected_bids: true,
    };
    // console.log('Params:', params);
    const results = await this.freelancerService.updateProjectsCall(params);
    // console.log('Results:', results);
    if (!results.error) {
      if (results.data.length > 0) {
        for (const row of results.data) {
          let project = await this.entityManager.getRepository('Project').findOneBy({
            remoteId: parseInt(row['id']),
          });

          if (!project) {
            console.log('Project not found:', row['id']);
          }

          project.title = row['title'];
          project.status = row['status'];
          project.seoUrl = row['seo_url'];
          project.currency = row['currency']['code'];
          project.description = row['description'];
          project.budget = row['budget'];
          project.hourlyProjectInfo = row['hourly_project_info'];
          project.bidStats = row['bid_stats'];
          project.language = row['language'];
          project.location = row['location'];
          project.trueLocation = row['true_location'];
          project.ownerInfo = row['owner_info'];

          await this.entityManager.getRepository('Project').save(project);
        }
      }
    }

    console.log('Updating projects:', payload);
  }
}
