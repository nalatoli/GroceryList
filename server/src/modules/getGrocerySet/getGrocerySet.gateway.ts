import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GetGrocerySetService } from './getGrocerySet.service';
import { getShopperRoom } from 'src/utils/shared.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class GetGrocerySetGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly service: GetGrocerySetService) {
    console.log('[WS] GetGrocerySetGateway constructed');
  }

  @SubscribeMessage('getGroceryList')
  async handleMessage(client: Socket, payload: number): Promise<void> {
    await client.join(getShopperRoom(payload));
    Logger.log(`Client joined shopper room ${payload}`);
    client.emit('getGroceryList', await this.service.getGrocerySet(payload));
  }
}
