import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/queue',
})
export class QueueGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients = new Map<string, { branchId?: string; role?: string }>();

  handleConnection(client: Socket) {
    this.connectedClients.set(client.id, {});
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('join-branch')
  handleJoinBranch(@ConnectedSocket() client: Socket, @MessageBody() data: { branchId: string }) {
    client.join(`branch:${data.branchId}`);
    this.connectedClients.set(client.id, { ...this.connectedClients.get(client.id), branchId: data.branchId });
  }

  @SubscribeMessage('join-patient')
  handleJoinPatient(@ConnectedSocket() client: Socket, @MessageBody() data: { userId: string }) {
    client.join(`patient:${data.userId}`);
  }

  broadcastQueueUpdate(data: { type: string; [key: string]: any }) {
    this.server.emit('queue-update', data);
  }

  notifyBranch(branchId: string, data: { type: string; [key: string]: any }) {
    this.server.to(`branch:${branchId}`).emit('queue-update', data);
  }

  notifyPatient(userId: string, data: { type: string; [key: string]: any }) {
    this.server.to(`patient:${userId}`).emit('notification', data);
  }

  broadcastNotification(data: { type: string; title: string; body: string }) {
    this.server.emit('broadcast', data);
  }

  getConnectedCount(): number {
    return this.connectedClients.size;
  }
}
