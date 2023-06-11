import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

export enum SocketEvent {
	IsOnline = 'isOnline',
	Message = 'message',
}

@Injectable({
	providedIn: 'root',
})
export class SocketService {
	private socket: Socket;

	constructor() {
		this.socket = io();
	}

	public disconnect(): void {
		this.socket.disconnect();
	}

	public send(eventName: SocketEvent, data: object): void {
		this.socket.emit(eventName, data);
	}

	public on(eventName: SocketEvent, func: any): void {
		this.socket.on(eventName, func);
	}
}
