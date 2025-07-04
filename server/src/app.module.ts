import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GetGrocerySetGateway } from './modules/getGrocerySet/getGrocerySet.gateway';
import { GetGrocerySetService } from './modules/getGrocerySet/getGrocerySet.service';
import { UpdateGroceryItemGateway } from './modules/updateGroceryItem/updateGroceryItem.gateway';
import { UpdateGroceryItemService } from './modules/updateGroceryItem/updateGroceryItem.service';
import { UpdateGroceryAisleGateway } from './modules/updateGroceryAisle/updateGroceryAisle.gateway';
import { UpdateGroceryAisleService } from './modules/updateGroceryAisle/updateGroceryAisle.service';
import { AddGroceryItemGateway } from './modules/addGroceryItem/addGroceryItem.gateway';
import { AddGroceryItemService } from './modules/addGroceryItem/addGroceryItem.service';
import { DeleteGroceryItemGateway } from './modules/deleteGroceryItem/deleteGroceryItem.gateway';
import { DeleteGroceryItemService } from './modules/deleteGroceryItem/deleteGroceryItem.service';
import { ClearGrocerySetGateway } from './modules/clearGrocerySet/clearGrocerySet.gateway';
import { ClearGrocerySetService } from './modules/clearGrocerySet/clearGrocerySet.service';
import { ResetGrocerySetGateway } from './modules/resetGrocerySet/resetGrocerySet.gateway';
import { ResetGrocerySetService } from './modules/resetGrocerySet/resetGrocerySet.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
  ],
  providers: [
    GetGrocerySetGateway,
    GetGrocerySetService,
    UpdateGroceryItemGateway,
    UpdateGroceryItemService,
    UpdateGroceryAisleGateway,
    UpdateGroceryAisleService,
    AddGroceryItemGateway,
    AddGroceryItemService,
    DeleteGroceryItemGateway,
    DeleteGroceryItemService,
    ClearGrocerySetGateway,
    ClearGrocerySetService,
    ResetGrocerySetGateway,
    ResetGrocerySetService,
  ],
})
export class AppModule {}
