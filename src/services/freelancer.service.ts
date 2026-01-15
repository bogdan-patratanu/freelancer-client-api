import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FreelancerService {
  private readonly logger = new Logger(FreelancerService.name);

  constructor(private httpService: HttpService) {}

  async getSkills(): Promise<any> {
    const url = process.env.FREELANCER_API_URL + '/api/projects/0.1/jobs/';
    const headers = { 'Freelancer-OAuth-V1': process.env.FREELANCER_API_KEY };

    try {
      const response = await firstValueFrom(this.httpService.get(url, { headers }));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching skills', error.stack);
      throw error;
    }
  }

  async searchActiveProjects(skillIds: number[]): Promise<any> {
    const url = process.env.FREELANCER_API_URL + '/api/projects/0.1/projects/active';
    const headers = { 'Freelancer-OAuth-V1': process.env.FREELANCER_API_KEY };
    const fortyEightHoursAgo = Math.floor((Date.now() - 192 * 60 * 60 * 1000) / 1000);

    const allProjects = [];
    let offset = 0;
    const limit = 50;
    let hasMore = true;
    skillIds = [];
    try {
      this.logger.log(
        `Searching projects with skills: [${skillIds.join(', ')}] from last 48 hours`,
      );

      while (hasMore) {
        const params = {
          full_description: true,
          job_details: true,
          local_details: true,
          location_details: true,
          upgrade_details: true,
          owner_info: true,
          jobs: skillIds.join(','),
          from_time: fortyEightHoursAgo,
          limit,
          offset,
        };

        this.logger.log(`Fetching batch at offset ${offset}...`);

        try {
          const response = await firstValueFrom(
            this.httpService.get(url, { headers, params, timeout: 10000 }),
          );

          const projects = response.data?.result?.projects || [];

          if (projects.length === 0) {
            hasMore = false;
            this.logger.log('No more projects found, stopping pagination');
          } else {
            allProjects.push(...projects);
            this.logger.log(`Fetched ${projects.length} projects (total: ${allProjects.length})`);
            offset += limit;

            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        } catch (error) {
          this.logger.error(`Error fetching batch at offset ${offset}: ${error.message}`);
          hasMore = false; // Break loop on error
          throw error; // Rethrow to be caught by outer catch
        }
      }

      this.logger.log(`Completed: Found ${allProjects.length} total projects`);

      return allProjects;
    } catch (error) {
      this.logger.error('Error searching active projects', error.stack);
      throw error;
    }
  }
}
