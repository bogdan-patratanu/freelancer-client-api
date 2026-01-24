import { Controller, Get, Post, Query } from '@nestjs/common';
import { Between } from 'typeorm';
import { Project } from '../../database/entities';
import { ProjectsService } from './projects.service';
import { BaseCrudController } from '../../common/base-crud.controller';
import { AppService } from '../../services/app.service';

@Controller('projects')
export class ProjectsController extends BaseCrudController<Project> {
  constructor(
    protected readonly service: ProjectsService,
    protected readonly appService: AppService
  ) {
    super(service);
  }

  @Get()
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    // Set default values if not provided
    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    // console.log('pageNumber', pageNumber);
    // console.log('limitNumber', limitNumber);

    const countriesByUtcOffset = {
      utc0: [
        'ie', // Ireland
        'pt', // Portugal
        'gb', // United Kingdom
        'is', // Iceland
        'gh', // Ghana
        'ci', // Ivory Coast
        'sn', // Senegal
        'gm', // Gambia
        'sl', // Sierra Leone
        'lr', // Liberia
        'bf', // Burkina Faso
        'tg', // Togo
        'ml', // Mali
        'mr', // Mauritania
        'gn', // Guinea
        'gw', // Guinea-Bissau
        'eh', // Western Sahara
      ],

      utc1: [
        'fr', // France
        'de', // Germany
        'es', // Spain
        'it', // Italy
        'be', // Belgium
        'nl', // Netherlands
        'lu', // Luxembourg
        'ch', // Switzerland
        'at', // Austria
        'pl', // Poland
        'cz', // Czech Republic
        'sk', // Slovakia
        'hu', // Hungary
        'si', // Slovenia
        'hr', // Croatia
        'dk', // Denmark
        'no', // Norway
        'se', // Sweden
        'al', // Albania
        'rs', // Serbia
        'me', // Montenegro
        'mk', // North Macedonia
        'ba', // Bosnia and Herzegovina
        'xk', // Kosovo
        'mt', // Malta
        'ad', // Andorra
        'mc', // Monaco
        'sm', // San Marino
        'va', // Vatican
        'dz', // Algeria
        'tn', // Tunisia
        'ng', // Nigeria
        'ne', // Niger
        'td', // Chad
        'cm', // Cameroon
        'cf', // Central African Republic
        'cg', // Republic of the Congo
        'ga', // Gabon
        'gq', // Equatorial Guinea
      ],

      utc2: [
        'gr', // Greece
        'bg', // Bulgaria
        'fi', // Finland
        'ee', // Estonia
        'lv', // Latvia
        'lt', // Lithuania
        'ua', // Ukraine
        'md', // Moldova
        'cy', // Cyprus
        'il', // Israel
        'ps', // Palestine
        'eg', // Egypt
        'ly', // Libya
        'za', // South Africa
        'zw', // Zimbabwe
        'zm', // Zambia
        'bw', // Botswana
        'mw', // Malawi
        'mz', // Mozambique
        'ls', // Lesotho
        'sz', // Eswatini
        'na', // Namibia
      ],

      utc3: [
        'ru', // Russia (western part)
        'tr', // Turkey
        'by', // Belarus
        'ge', // Georgia
        'am', // Armenia
        'az', // Azerbaijan
        'sa', // Saudi Arabia
        'iq', // Iraq
        'kw', // Kuwait
        'qa', // Qatar
        'bh', // Bahrain
        'ae', // United Arab Emirates
        'om', // Oman
        'jo', // Jordan
        'lb', // Lebanon
        'sy', // Syria
        'ye', // Yemen
        'ke', // Kenya
        'ug', // Uganda
        'tz', // Tanzania
        'so', // Somalia
        'et', // Ethiopia
        'er', // Eritrea
        'dj', // Djibouti
        'mg', // Madagascar
      ],

      utc4: [
        'az', // Azerbaijan (also UTC+4)
        'ge', // Georgia
        'am', // Armenia
        'ae', // United Arab Emirates
        'om', // Oman
        'sc', // Seychelles
        'mu', // Mauritius
      ],
    };

    const proximityCountries = [
      ...countriesByUtcOffset.utc0,
      ...countriesByUtcOffset.utc1,
      ...countriesByUtcOffset.utc2,
      ...countriesByUtcOffset.utc3,
      ...countriesByUtcOffset.utc4,
    ];
    const remoteCountries = ['us', 'ca', 'au', 'nz'];
    // console.log('now', new Date().toISOString());

    const filters = {
      status: 'active',
      endDate: Between(new Date(Date.now()).toISOString(), new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()),
    };
    console.log('filters', filters);
    const result = await this.service.findAllPaginated(filters, pageNumber, 1000, {submitDate: 'ASC'});
    for (const project of result.data) {
      let displayType = 'othersFixed';
      let ownerCountry = '';
      let ownerCountryName = '';
      if (project.ownerInfo && project.ownerInfo['country']) {
        ownerCountry = project.ownerInfo['country']['code'];
        ownerCountryName = project.ownerInfo['country']['name'];
      }
      if (ownerCountry == 'ro' && project.type === 'hourly') {
        displayType = 'romaniaHourly';
      } else if (ownerCountry == 'ro' && project.type === 'fixed') {
        displayType = 'romaniaFixed';
      } else if (proximityCountries.includes(ownerCountry) && project.type === 'hourly') {
        displayType = 'proximityHourly';
      } else if (proximityCountries.includes(ownerCountry) && project.type === 'fixed') {
        displayType = 'proximityFixed';
      } else if (remoteCountries.includes(ownerCountry) && project.type === 'hourly') {
        displayType = 'remoteHourly';
      } else if (remoteCountries.includes(ownerCountry) && project.type === 'fixed') {
        displayType = 'remoteFixed';
      } else if (project.type === 'hourly') {
        displayType = 'othersHourly';
      } else if (project.type === 'fixed') {
        displayType = 'othersFixed';
      }

      project['displayType'] = displayType;
      project['ownerCountry'] = ownerCountryName;
    }
    return result;
  }

  @Post('update-projects')
  async updateProjects() {
    this.appService.updateProjects();
    return { message: 'This endpoint is for updating projects' };
  }
}
