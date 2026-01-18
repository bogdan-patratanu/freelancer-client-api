import { Command, CommandRunner } from 'nest-commander';
import { FreelancerService } from '../services/freelancer.service';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Skill, Project } from '../database/entities/index';
import { AppService } from '../services/app.service';
import * as fs from 'fs';
import * as path from 'path';

@Command({ name: 'get-skills', description: 'Get the list of skills' })
export class GetSkillsCommand extends CommandRunner {
  constructor(
    private readonly freelancerService: FreelancerService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly appService: AppService,
  ) {
    super();
  }

  async run(): Promise<void> {
    const skillsResponse = await this.freelancerService.getSkills();
    if (skillsResponse?.status === 'success' && Array.isArray(skillsResponse.result)) {
      console.log(`Successfully received ${skillsResponse.result.length} skills`);
      for (const row of skillsResponse.result) {
        let skill = await this.entityManager.getRepository('Skill').findOneBy({
          remoteId: parseInt(row['id']),
        });
        if (!skill) {
          skill = new Skill();
        }
        skill.remoteId = parseInt(row['id']);
        skill.name = row['name'];
        skill.seoUrl = row['seo_url'];
        skill.local = row['local'];
        skill.categories = row['category'];
        await this.entityManager.getRepository('Skill').save(skill);
      }
    } else {
      console.error('Invalid skills response:', skillsResponse);
    }
  }
}

@Command({ name: 'get-projects', description: 'Get the list of last 48 hours active projects' })
export class GetProjectsCommand extends CommandRunner {
  constructor(
    private readonly freelancerService: FreelancerService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly appService: AppService,
  ) {
    super();
  }

  async run(): Promise<void> {
    console.log(`Start fetching projects -> OBSOLETE`);
    return;
    let skills = await this.appService.skillsForQuery();
    const projectsResponse = await this.freelancerService.searchActiveProjects(skills);
    for (const row of projectsResponse) {
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
          project.remoteId = row['id'];
          project.title = row['title'];
          project.description = row['description'];
          project.status = row['status'];
          project.seoUrl = row['seo_url'];
          project.currency = row['currency']['code'];          
          project.jobs = row['jobs'];
          project.submitDate = new Date(Number(row['submitdate']) * 1000);
          project.type = row['type'];
          project.bidPeriod = row['bidperiod'];
          project.budget = row['budget'];
          project.hourlyProjectInfo = row['hourly_project_info'];
          project.bidStats = row['bid_stats'];
          project.timeSubmited = new Date(Number(row['time_submitted']) * 1000);
          project.timeUpdated = new Date(Number(row['time_updated']) * 1000);
          project.language = row['language'];
          project.location = row['location'];
          project.trueLocation = row['true_location'];
          project.ownerInfo = row['owner_info'];


          await this.entityManager.getRepository('Project').save(project);
        }
      }
    }

    // Write to JSON file
    const outputDir = path.join(process.cwd(), 'data', 'projects');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputPath = path.join(outputDir, `projects_${timestamp}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(projectsResponse, null, 2));
    console.log(`Projects data written to ${outputPath}`);
  }
}
