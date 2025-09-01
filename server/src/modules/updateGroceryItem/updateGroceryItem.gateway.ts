import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UpdateGroceryItemService } from './updateGroceryItem.service';
import { Grocery } from 'src/models/Grocery';
import { getShopperRoom } from 'src/utils/shared.service';

@WebSocketGateway()
export class UpdateGroceryItemGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly service: UpdateGroceryItemService) {}

  @SubscribeMessage('updateGroceryItem')
  async handleMessage(client: Socket, payload: Grocery): Promise<void> {
    this.server
      .to(getShopperRoom(payload.shopper.idx))
      .emit('groceryItemUpdated', await this.service.updateGrocery(payload));
  }
}
