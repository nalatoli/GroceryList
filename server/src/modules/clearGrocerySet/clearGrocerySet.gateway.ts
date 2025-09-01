import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ClearGrocerySetService } from './clearGrocerySet.service';
import { getShopperRoom } from 'src/utils/shared.service';

@WebSocketGateway()
export class ClearGrocerySetGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly service: ClearGrocerySetService) {}

  @SubscribeMessage('clearGroceryList')
  async handleMessage(client: Socket, payload: number): Promise<void> {
    await this.service.clearGrocerySet();
    this.server.to(getShopperRoom(payload)).emit('clearGroceryList');
  }
}
