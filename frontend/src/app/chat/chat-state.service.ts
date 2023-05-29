import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SingleChatDTO } from './models/single-chat-dto.model';

@Injectable({
	providedIn: 'root',
})
export class ChatStateService {
	private chatSelectedSubject: BehaviorSubject<SingleChatDTO | null> =
		new BehaviorSubject<SingleChatDTO | null>(null);

	chatSelected$: Observable<SingleChatDTO | null> =
		this.chatSelectedSubject.asObservable();

	selectChat(chat: SingleChatDTO): void {
		this.chatSelectedSubject.next(chat);
	}
}
