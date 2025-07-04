import { IoAdapter } from '@nestjs/platform-socket.io';
import { Injectable } from '@nestjs/common';
import { ServerOptions } from 'socket.io';

@Injectable()
export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const mergedOptions = Object.assign({}, options, {
      cors: {
        origin: '*',
      },
    });
    return super.createIOServer(port, mergedOptions);
  }
}
