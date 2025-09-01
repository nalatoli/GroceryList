import { Inject, Injectable } from '@nestjs/common';
import { GroceryEntity } from 'src/models/Grocery';
import { DataSource } from 'typeorm';

@Injectable()
export class ResetGrocerySetService {
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {}
  async resetGrocerySet(shopperId: number): Promise<void> {
    await this.dataSource
      .getRepository(GroceryEntity)
      .update({ shopper: { id: shopperId } }, { isChecked: false });
  }
}
