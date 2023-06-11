import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageDTO } from '../models/message-dto.model';
import { Observable, Subject } from 'rxjs';
import {
	SocketEvent,
	SocketService,
} from 'src/app/common/services/socket-service/socket.service';

@Injectable({
	providedIn: 'root',
})
export class MessageService {
	constructor(
		private httpClient: HttpClient,
		private socketService: SocketService
	) {
		socketService.on(SocketEvent.Message, (data: MessageDTO) => {
			this.newMessagesSubject.next(data);
		});
	}

	private newMessagesSubject = new Subject<MessageDTO>();
	newMessages$: Observable<MessageDTO> =
		this.newMessagesSubject.asObservable();

	getMessages(chatId: string): Observable<MessageDTO[]> {
		return this.httpClient.get<MessageDTO[]>(
			`/api/app/messages?chatId=${chatId}`
		);
	}

	sendMessage(chatId: string, message: string): void {
		this.socketService.send(SocketEvent.Message, {
			chatId,
			message,
		});
	}
}
