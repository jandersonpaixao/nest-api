import { DataSource, DataSourceOptions } from 'typeorm';
import { Album } from '../album/entities/album.entity';
import dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Album],
  migrations: ['src/migration/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
