import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
	providedIn: 'root',
})
export class SocketService {
	private socket: Socket;

	constructor() {
		this.socket = io();
	}

	public send(eventName: string, data: object): void {
		this.socket.emit(eventName, data);
	}

	public on(eventName: string, func: any): void {
		this.socket.on(eventName, func);
	}
}
