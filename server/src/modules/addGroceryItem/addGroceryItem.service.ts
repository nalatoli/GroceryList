import { Inject, Injectable } from '@nestjs/common';
import { Grocery, GroceryEntity } from 'src/models/Grocery';
import { GroceryAddRequest } from 'src/models/GroceryAddRequest';
import { DataSource } from 'typeorm';

@Injectable()
export class AddGroceryItemService {
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {}

  async getExistingEntity(
    payload: GroceryAddRequest,
  ): Promise<GroceryEntity | null> {
    return await this.dataSource
      .getRepository(GroceryEntity)
      .createQueryBuilder('item')
      .where('TRIM(LOWER(item.name)) = TRIM(LOWER(:name))', {
        name: payload.name,
      })
      .getOne();
  }

  async getNewGroceryItem(payload: GroceryAddRequest): Promise<Grocery> {
    const result = await this.dataSource.getRepository(GroceryEntity).save({
      isChecked: false,
      name: payload.name,
      quantity: payload.quantity,
    });

    const dto = await this.dataSource.getRepository(GroceryEntity).findOne({
      where: { id: result.id },
      relations: { aisle: true },
    });

    if (!dto) {
      throw new Error('Failed to create new grocery item');
    }

    return {
      idx: dto.id,
      isChecked: dto.isChecked,
      name: dto.name,
      quantity: dto.quantity,
    };
  }

  async getExistingGroceryItem(
    payload: GroceryAddRequest,
    existingItem: GroceryEntity,
  ): Promise<Grocery> {
    await this.dataSource.getRepository(GroceryEntity).update(
      { id: existingItem.id },
      {
        isChecked: existingItem.isChecked,
        name: existingItem.name,
        quantity: payload.quantity,
        aisle: existingItem.aisle ? { id: existingItem.aisle.id } : undefined,
      },
    );

    return {
      idx: existingItem.id,
      isChecked: existingItem.isChecked,
      name: payload.name,
      quantity: payload.quantity,
    };
  }
}
