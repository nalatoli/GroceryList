import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.config';

export const AppDataSource = new DataSource(dataSourceOptions);
