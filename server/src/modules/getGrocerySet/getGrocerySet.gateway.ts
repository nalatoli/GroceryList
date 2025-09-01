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
  constructor(private readonly service: GetGrocerySetService) {
    console.log('[WS] GetGrocerySetGateway constructed');
  }

  @SubscribeMessage('registerGroceryList')
  async handleMessage(client: Socket, payload: number): Promise<void> {
    console.log(`Client joining shopper room ${payload}`);
    await client.join(getShopperRoom(payload));
    console.log(`Client joined shopper room ${payload}`);
    client.emit('getGroceryList', await this.service.getGrocerySet(payload));
  }
}
