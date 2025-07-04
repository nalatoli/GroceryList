import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ClearGrocerySetService } from './clearGrocerySet.service';

@WebSocketGateway()
export class ClearGrocerySetGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly service: ClearGrocerySetService) {}

  @SubscribeMessage('clearGroceryList')
  async handleMessage(): Promise<void> {
    await this.service.clearGrocerySet();
    this.server.emit('clearGroceryList');
  }
}
