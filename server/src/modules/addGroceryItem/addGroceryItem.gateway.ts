import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AddGroceryItemService } from './addGroceryItem.service';
import { GroceryAddRequest } from 'src/models/GroceryAddRequest';
import { groceryRepo } from 'src/utils/db.repo';

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
    const existingItem = await groceryRepo
      .createQueryBuilder('item')
      .where('TRIM(LOWER(item.name)) = TRIM(LOWER(:name))', {
        name: payload.name,
      })
      .getOne();

    if (existingItem) {
      this.server.emit(
        'groceryItemUpdated',
        await this.service.getExistingGroceryItem(payload, existingItem),
      );
    } else {
      this.server.emit(
        'addGroceryItem',
        await this.service.getNewGroceryItem(payload),
      );
    }
  }
}
