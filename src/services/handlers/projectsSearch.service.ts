import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { FreelancerService } from '../freelancer.service';
import { Project, Task, Notification } from '../../database/entities';

@Injectable()
export class ProjectsSearchHandler {
  constructor(
    private readonly appService: AppService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly freelancerService: FreelancerService,
  ) {}

  async handle(payload: any) {
    const results = await this.freelancerService.activeProjectsCall(payload);
    const skills = this.appService.skillsForQuery();

    if (!results.error) {
      if (results.data.length > 0) {
        for (const row of results.data) {
          let isValid = false;
          for (const line of row['jobs']) {
            if (skills.includes(parseInt(line['id']))) {
              isValid = true;
            }
          }
          if (isValid) {
            let project = await this.entityManager.getRepository('Project').findOneBy({
              remoteId: parseInt(row['id']),
            });
            if (!project) {
              project = new Project();
            }
            project.remoteId = row['id'];
            project.title = row['title'];
            project.description = row['description'];
            project.status = row['status'];
            project.seoUrl = row['seo_url'];
            project.currency = row['currency']['code'];
            project.jobs = row['jobs'];
            project.submitDate = new Date(Number(row['submitdate']) * 1000);
            project.type = row['type'];
            project.bidPeriod = parseInt(row['bidperiod']);
            project.budget = row['budget'];
            project.hourlyProjectInfo = row['hourly_project_info'];
            project.bidStats = row['bid_stats'];
            project.timeSubmited = new Date(Number(row['time_submitted']) * 1000);
            project.timeUpdated = new Date(Number(row['time_updated']) * 1000);
            project.endDate = new Date(
              project.submitDate.getTime() + project.bidPeriod * 24 * 60 * 60 * 1000,
            );
            project.language = row['language'];
            project.location = row['location'];
            project.trueLocation = row['true_location'];
            project.ownerInfo = row['owner_info'];

            const { displayType, ownerCountry, ownerCountryName } =
              await this.appService.getProjectDisplayType(project as any);
            project.displayType = displayType;

            await this.entityManager.getRepository('Project').save(project);

            if (ownerCountryName == 'ro' || project.language == 'ro') {
              let notification = new Notification();
              notification.subject = 'Project nou pe Romania';
              notification.body = 'A fost adaugat un nou project pe Romania : <a href="https://www.freelancer.com/projects/' + project.seoUrl + '">' + project.seoUrl + '</a>';
              await this.entityManager.getRepository('Notification').save(notification);
            }
          }
        }
        payload.offset += 100;

        const task = new Task();
        task.handler = 'projectsSearch';
        task.payload = payload;
        task.status = 'new';
        task.processed = false;
        await this.entityManager.getRepository('Task').save(task);
        return results.message;
      }
      return 'No more projects to process';
    } else {
      return results.message;
    }
  }
}
