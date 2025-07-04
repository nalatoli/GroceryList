import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplication, Injectable } from '@nestjs/common';
import { ServerOptions } from 'socket.io';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SocketIoAdapter extends IoAdapter {
  constructor(
    private readonly app: INestApplication,
    private readonly configService: ConfigService,
  ) {
    super(app);
  }
  createIOServer(port: number, options?: ServerOptions): any {
    const origin = this.configService.get<string>('FRONTEND_ORIGIN');
    if (!origin) {
      throw new Error('Missing FRONTEND_ORIGIN');
    }

    const mergedOptions = Object.assign({}, options, {
      cors: {
        origin: origin,
      },
    });
    return super.createIOServer(port, mergedOptions);
  }
}
