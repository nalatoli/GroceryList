import { Injectable } from '@nestjs/common';
import { Grocery } from 'src/models/Grocery';
import { groceryRepo } from 'src/utils/db.repo';

@Injectable()
export class UpdateGroceryItemService {
  async updateGrocery(payload: Grocery): Promise<Grocery> {
    await groceryRepo.update(
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
