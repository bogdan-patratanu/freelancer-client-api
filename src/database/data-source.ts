import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_SERVER,
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: true,
  entities: ['src/database/entities/**/*.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  subscribers: [],
});
