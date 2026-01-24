import { Command, CommandRunner } from 'nest-commander';
import { FreelancerService } from '../services/freelancer.service';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Skill } from '../database/entities/index';
import { AppService } from '../services/app.service';

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

@Command({ name: 'get-new-projects', description: 'Get new projects' })
export class GetNewProjectsCommand extends CommandRunner {
  constructor(
    private readonly appService: AppService,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.appService.getNewProjects();
  }
}

@Command({ name: 'update-projects', description: 'Update projects' })
export class UpdateProjectsCommand extends CommandRunner {
  constructor(
    private readonly appService: AppService,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.appService.updateProjects();
  }
}
