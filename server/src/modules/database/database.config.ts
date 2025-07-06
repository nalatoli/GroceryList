import { DataSourceOptions } from 'typeorm';
import { GroceryEntity } from '../../models/Grocery';
import { AisleEntity } from '../../models/Aisle';
import { GroceryInfoEntity } from '../../models/GroceryInfo';
import { ShopperEntity } from '../../models/Shopper';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env.local') });

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.DB_PATH || 'data/groceries.db',
  entities: [GroceryEntity, GroceryInfoEntity, AisleEntity, ShopperEntity],
  migrations: ['src/migrations/**/*.ts'],
  synchronize: false,
  logging: false,
};
