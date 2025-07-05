import { Inject, Injectable } from '@nestjs/common';
import { Grocery, GroceryEntity } from 'src/models/Grocery';
import { DataSource } from 'typeorm';

@Injectable()
export class DeleteGroceryItemService {
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {}
  async deleteGroceryItem(payload: Grocery): Promise<Grocery> {
    await this.dataSource.getRepository(GroceryEntity).delete(payload.idx);
    return payload;
  }
}
