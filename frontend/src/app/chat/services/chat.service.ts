import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingleChatDTO } from '../models/single-chat-dto.model';

@Injectable({
	providedIn: 'root',
})
export class ChatService {
	constructor(private httpClient: HttpClient) {}

	getChats(): Observable<SingleChatDTO[]> {
		return this.httpClient.get<SingleChatDTO[]>('/api/app/chats');
	}
}
