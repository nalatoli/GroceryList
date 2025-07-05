import { Inject, Injectable } from '@nestjs/common';
import { Aisle, AisleEntity } from 'src/models/Aisle';
import { Grocery } from 'src/models/Grocery';
import { GroceryInfoEntity } from 'src/models/GroceryInfo';
import { DataSource } from 'typeorm';

@Injectable()
export class UpdateGroceryAisleService {
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {}
  async updateGroceryAisle(payload: {
    grocery: Grocery;
    aisle: Aisle | undefined;
  }): Promise<Aisle[]> {
    if (payload.aisle) {
      await this.dataSource.getRepository(GroceryInfoEntity).upsert(
        {
          name: payload.grocery.name,
          aisle: payload.aisle ? { id: payload.aisle.idx } : undefined,
        },
        ['name'],
      );
    } else {
      await this.dataSource
        .getRepository(GroceryInfoEntity)
        .createQueryBuilder()
        .delete()
        .where('TRIM(LOWER(name)) = TRIM(LOWER(:name))', {
          name: payload.grocery.name,
        })
        .execute();
    }

    return (
      await this.dataSource
        .getRepository(AisleEntity)
        .find({ relations: ['groceryInfos'] })
    ).map((e) => {
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
