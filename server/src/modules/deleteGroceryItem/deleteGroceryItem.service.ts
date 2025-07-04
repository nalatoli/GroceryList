import { Injectable } from '@nestjs/common';
import { Grocery } from 'src/models/Grocery';
import { groceryRepo } from 'src/utils/db.repo';

@Injectable()
export class DeleteGroceryItemService {
  async deleteGroceryItem(payload: Grocery): Promise<Grocery> {
    await groceryRepo.delete(payload.idx);
    return payload;
  }
}
