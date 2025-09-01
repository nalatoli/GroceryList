import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ResetGrocerySetService } from './resetGrocerySet.service';
import { getShopperRoom } from 'src/utils/shared.service';

@WebSocketGateway()
export class ResetGrocerySetGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly service: ResetGrocerySetService) {}

  @SubscribeMessage('resetGroceryList')
  async handleMessage(client: Socket, payload: number): Promise<void> {
    await this.service.resetGrocerySet(payload);
    this.server.to(getShopperRoom(payload)).emit('resetGroceryList');
  }
}
