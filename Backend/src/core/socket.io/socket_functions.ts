import { Socket } from 'socket.io';
import { SocketHandler, UserStatusDTO, SocketEvent } from './socket_handler';
import { SendMessageDTO } from './send_message_dto';
import { MessageService } from '../../app/messages/message_service';
import { SocketService } from '../service/socket_service';
import { ChatService } from '../../app/chats/chat_service';
import { MessageDTO, Sender } from '../../app/messages/message_dto';

export class SocketFunctions {
    public static onDisconnect(socket: Socket): void {
        SocketHandler.getInstance().removeSocket(socket);
    }

    public static onIsOnline(socket: Socket, data: UserStatusDTO): void {
        socket.emit(SocketEvent.IsOnline, {
            id: data.id,
            online: !!SocketHandler.getInstance().getUserSockets(data.id),
        });
    }

    public static async onMessage(socket: Socket, data: SendMessageDTO): Promise<void> {
        const jsonWebToken = SocketService.getJWTToken(socket);
        
        if (!jsonWebToken) {
            socket.disconnect();
            return;
        }

        const chat = await ChatService.getChatById(data.chatId);
        if (!chat) return;
        if (!chat.participants.includes(jsonWebToken.id)) return;

        MessageService.saveMessage({
            chatId: data.chatId,
            content: data.message,
            userId: jsonWebToken.id 
        });

        chat.participants.forEach((id: string) => {
            const sockets = SocketHandler.getInstance().getUserSockets(id);
            if (!sockets) return;

            Object.values(sockets).forEach((socket: Socket) => {
                socket.emit(SocketEvent.Message, new MessageDTO({
                    chatId: data.chatId,
                    userId: jsonWebToken.id,
                    content: data.message,
                    timestamp: new Date(),
                    sender: id == jsonWebToken.id ? Sender.Self : Sender.Other,
                }));
            });
        });
    }
}
