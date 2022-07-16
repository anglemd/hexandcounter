import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { from, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway()
export class WsEventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private io: Server;
  private roomPrefix: string = 'GAMEROOM_';
  public messageSubject$: Subject<ISocketMessageJson> = new Subject();

  //========
  afterInit(wsServer: Server) {
    this.io = wsServer;

    this.messageSubject$.subscribe((sockMsg) =>
      console.log('<message:' + sockMsg.socket.id + '>: ' + sockMsg.message),
    );
  }

  public registerListener(eventName: string, listener: (Socket, any) => void) {
    this.io.on(eventName, listener);
  }

  //========
  // THIS WILL BE CALLED WHEN A CLIENT DISCONNECTS:
  handleDisconnect(socket: Socket) {
    console.log('========= DISCONNECT ' + socket.id);
  }

  //========
  // THIS WILL BE CALLED WHEN A NEW CLIENT CONNECTS:
  handleConnection(socket: Socket) {
    console.log(
      '======== NEW CONNECTION ======== ' +
        socket.id +
        '   ' +
        this.clientCount,
    );
    socket.emit('message', 'Hello there!');
    // console.log(socket.id);
    socket.join('ALL_USERS');
  }

  //========
  @SubscribeMessage('message') // LISTEN FOR THE 'message' EVENT...
  onMessageRecieved(socket: Socket, text: string) {
    this.messageSubject$.next({ socket: socket, message: text });
    // console.log('WS msg-' + socket.id + ' => ' + text);
  }

  //========
  public get clientCount(): number {
    return this.io?.engine.clientsCount || 0;
  }
}

export interface ISocketMessageJson {
  socket: Socket;
  message: string;
}
// afterInit(wsServer: Server) {
//   // console.log('+++++++++++++++++++ WS GATEWAY ==================');
//   this.io = wsServer;

//   // this.io.on('connection', (socket) => {
//   //   console.log(
//   //     'NEW SOCKET CONNECTION WAS MADE (' + this.io.engine.clientsCount + ')',
//   //   );
//   //   // console.log('WS connections: ' + this.io.engine.clientsCount);
//   //   // console.log( this.io.of( "/").sockets.size ); // another way to count clients...

//   //   // if (Array.from(socket.rooms).length == 1) {
//   //   //   // THIS CLIENT DOES NOT HAVE A GAME ID YET...
//   //   //   socket.emit('client-id-needed'); // TELL CLIENT TO REBOOT IF THEY THINK THEY ARE CONNECTED, BUT GET THIS MESSAGE LATER.
//   //   // }
//   // });
// }

// sendMessageToOtherSockets(originatingSocketId: string) {
//   console.log('TEST SUCCESSFUL!!!===========');
//   this.io.except(originatingSocketId).emit('message', {
//     text:
//       'HELLO THERE!  ' +
//       originatingSocketId +
//       ' sent a message at ' +
//       new Date().toLocaleTimeString(),
//   });
// }

// public announceGameResult( gameResult:GameResultDef ){
//   let roomId = this.roomPrefix + gameResult.gameId;
//   if (gameResult.socketId){
//     this.io.to(roomId).except( gameResult.socketId ).emit('game-result', gameResult);
//   }
// }

// public broadcastCommandToClients(
//   cmd: any,
//   originatingSocketId: string,
//   isUndo: boolean,
// ) {
//   // AFTER A COMMAND HAS BEEN PROCESSED ON SERVER, PASS THE COMMAND TO OTHER CLIENTS SO THEY CAN UPDATE THEIR STATE TOO.
//   let channel = isUndo == true ? 'do-command' : 'do-command';
//   this.io.except(originatingSocketId).emit(channel, cmd, isUndo);
// }

// @SubscribeMessage('join-game')
// async joinGame(
//   socket: Socket,
//   data: { gameId: string; userId: string; factions: [string] },
// ): Promise<any> {
//   console.log('we-events.gateway: joinGame()');
//   console.log('data', data);
//   let roomId = this.roomPrefix + data.gameId;
//   socket.join(roomId);
//   // ANNOUNCE TO OTHER USERS THAT SOMEONE HAS JOINED THE GAME...
//   // socket.to( roomId ).emit('message', {text: data.userId + " has joined the game." });
//   socket.to(roomId).emit('other-user-joined', {
//     userId: data.userId,
//     factions: data.factions,
//   });
//   console.log(Array.from(socket.rooms));
//   // socket.rooms.forEach( room=>{ console.log( room )});
//   return { eventName: 'join-game', status: 'ok', socketId: socket.id };
//   // IF WE RETURN AN OBJECT WITH THE 'event' PARAMETER, A NEW RESPONSE IS EMITTED AND THE CALLBACK ISN'T USED.
//   // return { event:'join-game', data: { status:'ok', socketId: socket.id }};
// }
