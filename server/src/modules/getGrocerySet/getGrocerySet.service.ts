import { Injectable } from '@nestjs/common';
import { groceryRepo, aisleRepo } from 'src/utils/db.repo';
import { GrocerySet } from 'src/models/GrocerySet';

@Injectable()
export class GetGrocerySetService {
  async getGrocerySet(): Promise<GrocerySet> {
    return {
      items: (await groceryRepo.find()).map((e) => {
        return {
          idx: e.id,
          isChecked: e.isChecked,
          name: e.name,
          quantity: e.quantity,
          aisle: e.aisle
            ? {
                idx: e.aisle.id,
                name: e.aisle.name,
              }
            : null,
        };
      }),
      aisles: (await aisleRepo.find({ relations: ['groceryInfos'] })).map(
        (e) => {
          return {
            idx: e.id,
            name: e.name,
            description: e.description,
            infos: e.groceryInfos.map((info) => {
              return {
                idx: info.id,
                name: info.name,
              };
            }),
          };
        },
      ),
    };
  }
}
