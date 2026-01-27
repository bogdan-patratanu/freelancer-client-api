import { Injectable, Logger } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Project, Task } from '../database/entities';
import { EntityManager, In } from 'typeorm';

@Injectable()
export class AppService {
  private readonly logger = new Logger('Application');

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  getAppLogger(): Logger {
    return this.logger;
  }

  async getHello(): Promise<any> {
    // const migrations = await this.entityManager.query('SELECT * FROM migrations');
    return 'Hello World!';
  }

  skillsForQuery(): Array<number> {
    let skills = [];
    skills.push(3); //PHP
    skills.push(9); //JavaScript
    skills.push(10); //XML
    skills.push(13); //Python
    skills.push(33); //Web Security
    skills.push(51); //AJAX
    skills.push(68); //SQL
    skills.push(69); //WordPress
    skills.push(72); //Twitter
    skills.push(90); //Magento
    skills.push(95); //Web Scraping
    skills.push(98); //Drupal
    skills.push(116); //Software Architecture
    skills.push(120); //CMS
    skills.push(124); //Microsoft Access
    skills.push(137); //eCommerce
    skills.push(138); //PayPal API
    skills.push(148); //Metatrader
    skills.push(205); //Zen Cart
    skills.push(219); //Website Testing
    skills.push(231); //OSCommerce
    skills.push(235); //CakePHP
    skills.push(236); //Zend
    skills.push(237); //Codeigniter
    skills.push(270); //Shell Script
    skills.push(287); //NoSQL Couch & Mongo
    skills.push(304); //Prestashop
    skills.push(305); //MySQL
    skills.push(323); //HTML5
    skills.push(335); //HTML
    skills.push(336); //UNIX
    skills.push(343); //jQuery / Prototype
    skills.push(344); //Freelancer API
    skills.push(363); //Virtuemart
    skills.push(385); //Symfony PHP
    skills.push(400); //Smarty PHP
    skills.push(402); //Yii
    skills.push(434); //MVC
    skills.push(454); //Website Management
    skills.push(472); //Database Administration
    skills.push(481); //Debugging
    skills.push(487); //webMethods
    skills.push(496); //Map Reduce
    skills.push(497); //Analytics
    skills.push(500); //Node.js
    skills.push(502); //Shopify
    skills.push(564); //Web Hosting
    skills.push(565); //Open Cart
    skills.push(568); //VPS
    skills.push(572); //QlikView
    skills.push(596); //backbone.js
    skills.push(598); //Express JS
    skills.push(600); //Knockout.js
    skills.push(606); //CasperJS
    skills.push(607); //PostgreSQL
    skills.push(613); //Software Development
    skills.push(621); //MariaDB
    skills.push(669); //Laravel
    skills.push(673); //Database Programming
    skills.push(683); //Network Administration
    skills.push(687); //Web Services
    skills.push(695); //Microsoft SQL Server
    skills.push(696); //SQLite
    skills.push(697); //RESTful
    skills.push(698); //Redis
    skills.push(704); //AngularJS
    skills.push(709); //Database Development
    skills.push(717); //Data Warehousing
    skills.push(728); //Elasticsearch
    skills.push(741); //Git
    skills.push(749); //Scrum
    skills.push(750); //ITIL
    skills.push(759); //React.js
    skills.push(763); //Stripe
    skills.push(772); //Heroku
    skills.push(773); //Google Maps API
    skills.push(774); //Grunt
    skills.push(775); //LESS/Sass/SCSS
    skills.push(799); //MQTT
    skills.push(801); //AMQP
    skills.push(873); //Wix
    skills.push(901); //JSON
    skills.push(913); //Artificial Intelligence
    skills.push(914); //Google Cloud Storage
    skills.push(916); //OAuth
    skills.push(917); //OpenSSL
    skills.push(918); //OpenStack
    skills.push(921); //Subversion
    skills.push(923); //Powershell
    skills.push(951); //App Developer
    skills.push(954); //Coding
    skills.push(962); //Programming
    skills.push(977); //Business Intelligence
    skills.push(979); //Typescript
    skills.push(983); //Raspberry Pi
    skills.push(1002); //Docker
    skills.push(1012); //cURL
    skills.push(1019); //Scripting
    skills.push(1020); //phpMyAdmin
    skills.push(1031); //Web Development
    skills.push(1037); //Object Oriented Programming (OOP)
    skills.push(1040); //Web Crawling
    skills.push(1041); //Twitter API
    skills.push(1042); //CSS3
    skills.push(1044); //Instagram API
    skills.push(1050); //XHTML
    skills.push(1073); //Website Analytics
    skills.push(1082); //Bash Scripting
    skills.push(1084); //Payment Gateway Integration
    skills.push(1087); //API
    skills.push(1088); //Full Stack Development
    skills.push(1092); //Backend Development
    skills.push(1093); //Frontend Development
    skills.push(1096); //Push Notification
    skills.push(1099); //SSIS (SQL Server Integration Services)
    skills.push(1103); //AWS Lambda
    skills.push(1107); //Datatables
    skills.push(1108); //Dojo
    skills.push(1110); //Charts
    skills.push(1114); //T-SQL (Transact Structures Query Language)
    skills.push(1116); //XSS (Cross-site scripting)
    skills.push(1118); //Scikit Learn
    skills.push(1123); //VBScript
    skills.push(1124); //Ext JS
    skills.push(1125); //SVG
    skills.push(1126); //Vue.js
    skills.push(1127); //ECMAScript
    skills.push(1128); //Handlebars.js
    skills.push(1130); //Underscore.js
    skills.push(1188); //Enterprise Architecture
    skills.push(1194); //GitLab
    skills.push(1218); //Solutions Architecture
    skills.push(1222); //Development Operations
    skills.push(1225); //Sass
    skills.push(1226); //DOM
    skills.push(1227); //HTTP
    skills.push(1239); //Web API
    skills.push(1240); //RESTful API
    skills.push(1241); //RxJS
    skills.push(1242); //NgRx
    skills.push(1243); //Angular Material
    skills.push(1244); //Karma Javascript
    skills.push(1245); //Jasmine Javascript
    skills.push(1246); //Protractor Javascript
    skills.push(1253); //NoSQL
    skills.push(1254); //MongoDB
    skills.push(1261); //Travis CI
    skills.push(1274); //NumPy
    skills.push(1275); //SciPy
    skills.push(1277); //Javascript ES6
    skills.push(1278); //ES8 Javascript
    skills.push(1314); //React Native
    skills.push(1325); //jQuery
    skills.push(1383); //Data Visualization
    skills.push(1384); //Pine Script
    skills.push(1405); //Twilio
    skills.push(1421); //Cloud Data
    skills.push(1423); //Data Integration
    skills.push(1424); //Data Modernization
    skills.push(1425); //ERP Software
    skills.push(1426); //Open Source
    skills.push(1456); //Cloud
    skills.push(1474); //Data Governance
    skills.push(1476); //Informatica Powercenter ETL
    skills.push(1481); //IT Operating Model
    skills.push(1482); //IT strategy
    skills.push(1491); //Cloud Procurement
    skills.push(1503); //Power BI
    skills.push(1523); //Yii2
    skills.push(1526); //PHP Slim
    skills.push(1544); //Vue.js Framework
    skills.push(1561); //ETL
    skills.push(1596); //AI/RPA development
    skills.push(1597); //Managed Analytics
    skills.push(1623); //React.js Framework
    skills.push(1629); //Kendo UI
    skills.push(1684); //GitHub
    skills.push(1685); //Redux.js
    skills.push(1686); //Shopify Development
    skills.push(1688); //Magento 2
    skills.push(1698); //PostgreSQL Programming
    skills.push(1701); //Amazon S3
    skills.push(1709); //MEAN Stack
    skills.push(1762); //AJAX Frameworks
    skills.push(1763); //AJAX Toolkit
    skills.push(1827); //Website Build
    skills.push(1832); //Website Optimization
    skills.push(1933); //Development
    skills.push(1935); //GraphQL
    skills.push(1977); //Automation
    skills.push(1989); //Architectural Engineering
    skills.push(1992); //Financial Software Development
    skills.push(1993); //IT Project Management
    skills.push(1996); //Technology Consulting
    skills.push(2014); //Electronic Data Interchange (EDI)
    skills.push(2044); //Reverse Engineering
    skills.push(2068); //Chatbot
    skills.push(2159); //App Development
    skills.push(2162); //Angular
    skills.push(2164); //API Development
    skills.push(2165); //API Integration
    skills.push(2205); //Cloudflare
    skills.push(2280); //Data Modeling
    skills.push(2281); //Predictive Analytics
    skills.push(2282); //Data Collection
    skills.push(2283); //Apigee
    skills.push(2285); //BigQuery
    skills.push(2292); //Data Management
    skills.push(2298); //Content Management System (CMS)
    skills.push(2299); //Software Engineering
    skills.push(2301); //TailWind
    skills.push(2304); //Performance Tuning
    skills.push(2307); //SSL
    skills.push(2312); //Informatica
    skills.push(2320); //Big Data
    skills.push(2321); //WebRTC
    skills.push(2323); //MetaTrader 4
    skills.push(2326); //Data Backup
    skills.push(2334); //Backtesting
    skills.push(2363); //LAMP
    skills.push(2367); //PayPal
    skills.push(2372); //MERN Stack
    skills.push(2373); //Quality Engineering
    skills.push(2374); //FinTech
    skills.push(2376); //Next.js
    skills.push(2377); //Web3.js
    skills.push(2380); //Telegram API
    skills.push(2381); //Gulp.js
    skills.push(2382); //Web Application
    skills.push(2384); //RabbitMQ
    skills.push(2389); //Amazon ECS
    skills.push(2395); //Angular 4
    skills.push(2396); //Angular 6
    skills.push(2397); //Nest.js
    skills.push(2398); //Docker Compose
    skills.push(2401); //PHPUnit
    skills.push(2402); //DigitalOcean
    skills.push(2403); //Amazon CloudFront
    skills.push(2423); //MERN
    skills.push(2425); //Micropython
    skills.push(2427); //OKTA
    skills.push(2429); //Power Automate
    skills.push(2430); //Proto
    skills.push(2435); //Tailwind CSS
    skills.push(2443); //WMS
    skills.push(2447); //Chart.js
    skills.push(2528); //Pandas
    skills.push(2559); //WordPress Multilingual
    skills.push(2562); //Microsoft PowerBI
    skills.push(2575); //Software Performance Testing
    skills.push(2576); //API Testing
    skills.push(2579); //CI/CD
    skills.push(2582); //WEBDEV
    skills.push(2620); //Google Apps Scripts
    skills.push(2623); //Metatrader 5
    skills.push(2647); //Core PHP
    skills.push(2651); //QR Code Making
    skills.push(2683); //Progressive Web Apps
    skills.push(2688); //FastAPI
    skills.push(2689); //System Administration
    skills.push(2691); //SOAP API
    skills.push(2695); //SaaS
    skills.push(2696); //Webpack
    skills.push(2703); //REST API
    skills.push(2718); //GPT-3
    skills.push(2719); //OpenAI
    skills.push(2723); //WordPress Plugin
    skills.push(2746); //CNC
    skills.push(2791); //ChatGPT
    skills.push(2795); //Discord API
    skills.push(2823); //Make.com
    skills.push(2824); //GPT-4V
    skills.push(2838); //GPT-4
    skills.push(2839); //Website Development
    skills.push(2858); //Nuxt.JS
    skills.push(2859); //Vercel
    skills.push(2985); //GenAI
    skills.push(2990); //Vertex AI
    skills.push(2997); //LinuxCNC
    skills.push(3001); //ChatGPT Search Optimization
    skills.push(3012); //Web Application Audit
    skills.push(3023); //Web Testing
    skills.push(3026); //VSCode
    skills.push(3098); //Frontend Frameworks
    skills.push(3111); //MQL5
    skills.push(3112); //n8n
    skills.push(3140); //RPA Development

    return skills;
  }

  async getNewProjects() {
    const config = await this.entityManager.getRepository('Miscellaneous').findOne({
      where: {
        area: 'config',
        code: 'time_back_search',
      },
    });

    if (!config) {
      this.getAppLogger().error('Time back config not found');
      return;
    }

    const skills = this.skillsForQuery();
    const timeBack = Math.floor((Date.now() - parseInt(config.name) * 60 * 60 * 1000) / 1000);
    const params: any = {
      full_description: true,
      job_details: true,
      local_details: true,
      location_details: true,
      upgrade_details: true,
      owner_info: true,
      jobs: skills.join(','),
      from_time: timeBack,
      limit: 100,
      offset: 0,
    };

    const task = new Task();
    task.handler = 'projectsSearch';
    task.payload = params;
    task.status = 'new';
    task.processed = false;
    await this.entityManager.getRepository('Task').save(task);
  }

  async updateProjects() {
    const startTime = new Date().toISOString();
    const endTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString();
    // console.log(`Query: SELECT remote_id FROM projects WHERE end_date >= '${startTime}' AND end_date <= '${endTime}'`);
    const rows = await this.entityManager.query(
      `
        SELECT remote_id, id FROM projects WHERE end_date >= ? and end_date <= ?
      `,
      [startTime, endTime],
    );

    console.log('Updating projects:', rows.length);

    // Create tasks in batches of 25
    const batchSize = 25;
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      const projectIds = batch.map((row) => row.remote_id);

      const task = new Task();
      task.handler = 'projectUpdate';
      task.payload = projectIds;
      task.status = 'new';
      task.processed = false;

      await this.entityManager.getRepository('Task').save(task);
      console.log(`Created task for projects ${i + 1}-${Math.min(i + batchSize, rows.length)}`);
    }

    const projectsToUpdate = rows.map((row) => row.id);
    await this.entityManager.getRepository('Project').update(
      { id: In(projectsToUpdate) },
      { status: 'updating' },
    );
  }

  async countTasks() {
    const tasks = await this.entityManager.query(
      'SELECT count(*) as toBeProcessed FROM tasks WHERE status = "new" and processed = 0',
    );
    return tasks[0].toBeProcessed;
  }

  async getProjectDisplayType(project: Project) {
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
    let ownerCountry = 'notSet';
    let ownerCountryName = 'notSet';
    let displayType = 'notSet';

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

    return {
      displayType,
      ownerCountry,
      ownerCountryName,
    };
  }
}
