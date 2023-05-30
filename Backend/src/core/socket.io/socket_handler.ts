import { Server, Socket } from 'socket.io';
import { SocketService } from '../service/socket_service';
import { SocketFunctions } from './socket_functions';

enum SocketEvent {
	IsOnline = 'isOnline',
    Connect = 'connect',
    Disconnect = 'disconnect'
}

interface ConnectedSocketList {
    // User Id
    [key: string]: {
        // Socket Id
        [key: string]: Socket;
    };
}

interface UserSockets {
    [key: string]: Socket
}

export interface UserStatusDTO {
    id: string;
}

export class SocketHandler {
    private static _instance: SocketHandler;

    private IO: Server;
    private connectedSockets: ConnectedSocketList = {};

    private constructor(io: Server) {
        this.IO = io;
        this.IO.on(SocketEvent.Connect, (socket: Socket) => {
            if (!SocketService.isAuthenticated(socket)) {
                socket.disconnect();
                return;
            }

            if (!this.setSocket(socket)) {
                socket.disconnect();
                return;
            }

            socket.on(SocketEvent.Disconnect, () => SocketFunctions.onDisconnect(socket));
            socket.on(SocketEvent.IsOnline, (data) => SocketFunctions.onIsOnline(socket, data));
        });
    }

    public static getInstance(io: Server | null = null): SocketHandler {
        if (!this._instance) {
            if (io === null) throw new Error('SocketHandler first time init needs a Server!');
            this._instance = new SocketHandler(io);
        }
        return this._instance;
    }

    public getUserSockets(userId: string): UserSockets {
        return this.connectedSockets[userId];
    }

    public removeSocket(socket: Socket): void {
        const token = SocketService.getJWTToken(socket);
        if (!token) {
            return;
        }

        if (!this.connectedSockets[token.id]) {
            return;
        }

        delete this.connectedSockets[token.id][socket.id];

        if (Object.keys(this.connectedSockets[token.id]).length <= 0) {
            delete this.connectedSockets[token.id];
            this.emitAllUserDisconnected(token.id);
        }
    }

    private setSocket(socket: Socket): boolean {
        const token = SocketService.getJWTToken(socket);
        if (!token) {
            return false;
        }

        if (!this.connectedSockets[token.id]) {
            this.connectedSockets[token.id] = {};
            this.emitAllUserConnected(token.id);
        }
        this.connectedSockets[token.id][socket.id] = socket;

        return true;
    }

    private emitAllUserConnected(userId: string): void {
        this.IO.emit('isOnline', {
            id: userId,
            online: true,
        });
    }

    private emitAllUserDisconnected(userId: string): void {
        this.IO.emit('isOnline', {
            id: userId,
            online: false,
        });
    }
}
