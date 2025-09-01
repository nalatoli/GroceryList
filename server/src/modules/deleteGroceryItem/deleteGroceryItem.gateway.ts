import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DeleteGroceryItemService } from './deleteGroceryItem.service';
import { Grocery } from 'src/models/Grocery';
import { getShopperRoom } from 'src/utils/shared.service';

@WebSocketGateway()
export class DeleteGroceryItemGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly service: DeleteGroceryItemService) {}

  @SubscribeMessage('deleteGroceryItem')
  async handleMessage(client: Socket, payload: Grocery): Promise<void> {
    this.server
      .to(getShopperRoom(payload.shopper.idx))
      .emit(
        'groceryItemDeleted',
        await this.service.deleteGroceryItem(payload),
      );
  }
}
