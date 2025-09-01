import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GetGrocerySetService } from './getGrocerySet.service';
import { getShopperRoom } from 'src/utils/shared.service';

@WebSocketGateway()
export class GetGrocerySetGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly service: GetGrocerySetService) {}

  @SubscribeMessage('registerGroceryList')
  async handleMessage(client: Socket, payload: number): Promise<void> {
    await client.join(getShopperRoom(payload));
    client.emit('getGroceryList', await this.service.getGrocerySet(payload));
  }
}
