import { WebSocketGateway, OnGatewayInit, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';

import { ChatsService } from './chats.service';
import { IMessage } from '../models/chats.models';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayInit {
  @WebSocketServer()
  private wss: Server;

  private logger: Logger = new Logger('ChatsGateway');

  constructor(
    private readonly chatsService: ChatsService,
  ) {}

  public afterInit(): void {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('msgToServer')
  public hangleMessage(_: any, data: any): void {
    this.chatsService.addMessage({
      messageText: data.messageText,
      chatId: data.chatId,
      userId: data.user.userId,
    } as IMessage);

    this.wss.emit(`msgToClient:chatId${data.chatId}`, {
      messageText: data.messageText,
      chatId: data.chatId,
      userId: data.user.userId,
    });
  }
}