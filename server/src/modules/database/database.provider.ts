import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { GroceryEntity } from 'src/models/Grocery';
import { AisleEntity } from 'src/models/Aisle';
import { GroceryInfoEntity } from 'src/models/GroceryInfo';

export const databaseProvider = {
  provide: 'DATA_SOURCE',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const dbPath = configService.get<string>('DB_PATH') || 'data/groceries.db';

    const dataSource = new DataSource({
      type: 'sqlite',
      database: dbPath,
      entities: [GroceryEntity, GroceryInfoEntity, AisleEntity],
      migrations: ['src/migrations/**/*.ts'],
      synchronize: true,
      logging: false,
    });

    return dataSource.initialize();
  },
};
