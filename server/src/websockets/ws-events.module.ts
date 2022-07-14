import { Module } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { WsEventsGateway } from './ws-events.gateway';

@Module({
  providers: [WsEventsGateway],
  exports: [WsEventsGateway],
})
export class WsEventsModule {}
