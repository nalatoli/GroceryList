import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { dataSourceOptions } from './database.config';
export const databaseProvider = {
  provide: 'DATA_SOURCE',
  inject: [ConfigService],
  useFactory: async () => {
    const dataSource = new DataSource(dataSourceOptions);
    return dataSource.initialize();
  },
};
