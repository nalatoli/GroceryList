import { Inject, Injectable } from '@nestjs/common';
import { AisleEntity } from 'src/models/Aisle';
import { GroceryEntity } from 'src/models/Grocery';
import { GrocerySet } from 'src/models/GrocerySet';
import { DataSource } from 'typeorm';

@Injectable()
export class GetGrocerySetService {
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {}
  async getGrocerySet(): Promise<GrocerySet> {
    return {
      items: (await this.dataSource.getRepository(GroceryEntity).find()).map(
        (e) => {
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
        },
      ),
      aisles: (
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
      }),
    };
  }
}
