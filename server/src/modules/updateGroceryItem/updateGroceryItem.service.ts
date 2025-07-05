import { Inject, Injectable } from '@nestjs/common';
import { Grocery, GroceryEntity } from 'src/models/Grocery';
import { DataSource } from 'typeorm';

@Injectable()
export class UpdateGroceryItemService {
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {}
  async updateGrocery(payload: Grocery): Promise<Grocery> {
    await this.dataSource.getRepository(GroceryEntity).update(
      { id: payload.idx },
      {
        isChecked: payload.isChecked,
        name: payload.name,
        quantity: payload.quantity,
      },
    );
    return payload;
  }
}
