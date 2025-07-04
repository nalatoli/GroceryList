import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GetGrocerySetService } from './getGrocerySet.service';

@WebSocketGateway()
export class GetGrocerySetGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly service: GetGrocerySetService) {}

  @SubscribeMessage('getGroceryList')
  async handleMessage(client: Socket): Promise<void> {
    client.emit('getGroceryList', await this.service.getGrocerySet());
  }
}
