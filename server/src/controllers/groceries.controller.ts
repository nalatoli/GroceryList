import { Controller, Get, Param, Inject } from '@nestjs/common';
import { GroceryEntity } from 'src/models/Grocery';
import { DataSource } from 'typeorm';

@Controller('api/groceries') // Base path: /api
export class GroceriesController {
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {}
  @Get(':shopperId')
  async getGroceries(@Param('shopperId') shopperId: number) {
    return await this.dataSource
      .getRepository(GroceryEntity)
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.shopper', 'shopper')
      .where('shopper.id = :shopperId', { shopperId: shopperId })
      .getMany();
  }
}
