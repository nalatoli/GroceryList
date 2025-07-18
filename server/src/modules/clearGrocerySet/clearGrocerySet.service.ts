import { Inject, Injectable } from '@nestjs/common';
import { GroceryEntity } from 'src/models/Grocery';
import { DataSource } from 'typeorm';

@Injectable()
export class ClearGrocerySetService {
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {}
  async clearGrocerySet(): Promise<void> {
    await this.dataSource.getRepository(GroceryEntity).clear();
  }
}
