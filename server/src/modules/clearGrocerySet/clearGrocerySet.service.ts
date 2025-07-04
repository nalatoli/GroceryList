import { Injectable } from '@nestjs/common';
import { groceryRepo } from 'src/utils/db.repo';

@Injectable()
export class ClearGrocerySetService {
  async clearGrocerySet(): Promise<void> {
    await groceryRepo.clear();
  }
}
