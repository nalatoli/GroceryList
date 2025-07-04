import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ResetGrocerySetService } from './resetGrocerySet.service';

@WebSocketGateway()
export class ResetGrocerySetGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly service: ResetGrocerySetService) {}

  @SubscribeMessage('resetGroceryList')
  async handleMessage(): Promise<void> {
    await this.service.resetGrocerySet();
    this.server.emit('resetGroceryList');
  }
}
