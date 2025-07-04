import { Injectable } from '@nestjs/common';
import { groceryRepo } from 'src/utils/db.repo';

@Injectable()
export class ResetGrocerySetService {
  async resetGrocerySet(): Promise<void> {
    await groceryRepo.updateAll({ isChecked: false });
  }
}
