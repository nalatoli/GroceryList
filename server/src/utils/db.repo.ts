import { AppDataSource } from 'src/data-source';
import { GroceryEntity } from 'src/models/Grocery';
import { AisleEntity } from 'src/models/Aisle';
import { GroceryInfoEntity } from 'src/models/GroceryInfo';

export const groceryRepo = AppDataSource.getRepository(GroceryEntity);
export const aisleRepo = AppDataSource.getRepository(AisleEntity);
export const groceryInfoRepo = AppDataSource.getRepository(GroceryInfoEntity);
