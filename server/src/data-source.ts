import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { GroceryEntity } from './models/Grocery';
import { AisleEntity } from './models/Aisle';
import { GroceryInfoEntity } from './models/GroceryInfo';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'data/groceries.db',
  entities: [GroceryEntity, GroceryInfoEntity, AisleEntity],
  migrations: ['src/migrations/**/*.ts'],
  synchronize: true,
  logging: false,
});
