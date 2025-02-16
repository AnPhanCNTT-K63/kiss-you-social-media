import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private users;
    private addUser;
    private removeUser;
    private getUser;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleAddUser(client: Socket, userId: string): void;
    handleSendMessage(client: Socket, payload: {
        senderId: string;
        receiverId: string;
        text: string;
    }): void;
}
