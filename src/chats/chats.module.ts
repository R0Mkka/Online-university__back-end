import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { ChatsService } from './chats.service';

import { ChatsController } from './chats.controller';

// TODO: Make gateways!
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    ChatsController,
  ],
  providers: [
    ChatsService,
  ],
})
export class ChatsModule { }
