import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FreelancerService {
  constructor(private httpService: HttpService) {}

  async getSkills(): Promise<any> {
    const url = 'https://www.freelancer.com/api/skills/0.1/skills/';
    const headers = { 'Freelancer-OAuth-V1': process.env.FREELANCER_API_KEY };
    const response = await firstValueFrom(
      this.httpService.get(url, { headers }),
    );
    return response.data;
  }
}
