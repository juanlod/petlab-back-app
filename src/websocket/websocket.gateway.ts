import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { environment } from 'src/environments/environment';

@WebSocketGateway(4202, {
  cors: { origin: environment.origin, credentials: true },
})
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Initialized!');
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    // Handle received message
    this.server.emit('message', data); // Broadcast the message to all connected clients
  }

  // En tu gateway

  @SubscribeMessage('text-input')
  handleTextInput(
    @MessageBody() data: { field: string; value: string; idClinica: string },
    @ConnectedSocket() client: Socket,
  ): void {
    // Retransmite el valor del texto, el campo, y el idClinica a todos los clientes conectados excepto el remitente
    client.broadcast.emit('text-input', {
      field: data.field,
      value: data.value,
      idClinica: data.idClinica,
    });
  }
}
