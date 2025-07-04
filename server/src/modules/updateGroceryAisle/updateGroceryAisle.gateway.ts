import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UpdateGroceryAisleService } from './updateGroceryAisle.service';
import { Grocery } from 'src/models/Grocery';
import { Aisle } from 'src/models/Aisle';

@WebSocketGateway()
export class UpdateGroceryAisleGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly service: UpdateGroceryAisleService) {}

  @SubscribeMessage('updateGroceryAisle')
  async handleMessage(
    client: Socket,
    payload: { grocery: Grocery; aisle: Aisle | undefined },
  ): Promise<void> {
    this.server.emit(
      'groceryAisleUpdated',
      await this.service.updateGroceryAisle(payload),
    );
  }
}
