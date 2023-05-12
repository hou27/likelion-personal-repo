import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../.env.dev' });

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/**/migrations/*.js'],
  migrationsTableName: 'migrations',
});
