import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AddGroceryItemService } from './addGroceryItem.service';
import { GroceryAddRequest } from 'src/models/GroceryAddRequest';
import { getShopperRoom } from 'src/utils/shared.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class AddGroceryItemGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly service: AddGroceryItemService) {}

  @SubscribeMessage('addGroceryItem')
  async handleMessage(
    client: Socket,
    payload: GroceryAddRequest,
  ): Promise<void> {
    const existingItem = await this.service.getExistingEntity(payload);

    if (existingItem) {
      Logger.log(`adding existing to ${payload.shopperId}`);
      this.server
        .to(getShopperRoom(payload.shopperId))
        .emit(
          'groceryItemUpdated',
          await this.service.getExistingGroceryItem(payload, existingItem),
        );
    } else {
      Logger.log(`adding new to ${payload.shopperId}`);
      this.server
        .to(getShopperRoom(payload.shopperId))
        .emit('addGroceryItem', await this.service.getNewGroceryItem(payload));
    }
  }
}
