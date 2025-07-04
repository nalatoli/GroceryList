import { Injectable } from '@nestjs/common';
import { Aisle } from 'src/models/Aisle';
import { Grocery } from 'src/models/Grocery';
import { groceryInfoRepo, aisleRepo } from 'src/utils/db.repo';

@Injectable()
export class UpdateGroceryAisleService {
  async updateGroceryAisle(payload: {
    grocery: Grocery;
    aisle: Aisle | undefined;
  }): Promise<Aisle[]> {
    if (payload.aisle) {
      await groceryInfoRepo.upsert(
        {
          name: payload.grocery.name,
          aisle: payload.aisle ? { id: payload.aisle.idx } : undefined,
        },
        ['name'],
      );
    } else {
      await groceryInfoRepo
        .createQueryBuilder()
        .delete()
        .where('TRIM(LOWER(name)) = TRIM(LOWER(:name))', {
          name: payload.grocery.name,
        })
        .execute();
    }

    return (await aisleRepo.find({ relations: ['groceryInfos'] })).map((e) => {
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
    });
  }
}
