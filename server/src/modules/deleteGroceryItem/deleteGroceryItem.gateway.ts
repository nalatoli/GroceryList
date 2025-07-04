import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DeleteGroceryItemService } from './deleteGroceryItem.service';
import { Grocery } from 'src/models/Grocery';

@WebSocketGateway()
export class DeleteGroceryItemGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly service: DeleteGroceryItemService) {}

  @SubscribeMessage('deleteGroceryItem')
  async handleMessage(client: Socket, payload: Grocery): Promise<void> {
    this.server.emit(
      'groceryItemDeleted',
      await this.service.deleteGroceryItem(payload),
    );
  }
}
