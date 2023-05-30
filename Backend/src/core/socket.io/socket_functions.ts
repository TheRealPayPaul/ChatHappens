import { Socket } from 'socket.io';
import { SocketHandler, UserStatusDTO } from './socket_handler';

export class SocketFunctions {
    public static onDisconnect(socket: Socket): void {
        SocketHandler.getInstance().removeSocket(socket);
    }

    public static onIsOnline(socket: Socket, data: UserStatusDTO): void {
        socket.emit('isOnline', {
            id: data.id,
            online: !!SocketHandler.getInstance().getUserSockets(data.id),
        });
    }
}
