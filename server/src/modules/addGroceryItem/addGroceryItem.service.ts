import { Injectable } from '@nestjs/common';
import { Grocery, GroceryEntity } from 'src/models/Grocery';
import { groceryRepo } from 'src/utils/db.repo';
import { GroceryAddRequest } from 'src/models/GroceryAddRequest';

@Injectable()
export class AddGroceryItemService {
  async getNewGroceryItem(payload: GroceryAddRequest): Promise<Grocery> {
    const result = await groceryRepo.save({
      isChecked: false,
      name: payload.name,
      quantity: payload.quantity,
    });

    const dto = await groceryRepo.findOne({
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
    await groceryRepo.update(
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
