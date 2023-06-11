import { Component, OnInit } from '@angular/core';
import { ChatStateService } from '../services/chat-state.service';
import { MessageService } from '../services/message.service';
import { MessageDTO } from '../models/message-dto.model';
import { UserDTO } from 'src/app/common/dtos/user-dto.model';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
	constructor(
		private chatStateService: ChatStateService,
		private messageService: MessageService
	) {}

	chatId: string | null;
	messages: MessageDTO[];
	users: UserDTO[];

	ngOnInit(): void {
		this.chatStateService.chatSelected$.subscribe((data) => {
			this.chatId = data?.id ?? null;
			this.users = [];
			if (data?.from) this.users.push(data.from);
			if (data?.to) this.users.push(data.to);
			this.fetchMessages();
		});

		this.messageService.newMessages$.subscribe((data: MessageDTO) => {
			if (data.chatId === this.chatId) {
				this.messages.unshift(data);
			}
		});
	}

	fetchMessages(): void {
		if (!this.chatId) {
			this.messages = [];
			return;
		}
		this.messageService.getMessages(this.chatId).subscribe({
			next: (messages: MessageDTO[]) => {
				this.messages = messages;
			},
		});
	}

	lookUpUsername(userId: string): string {
		const user = this.users.find((user: UserDTO) => {
			return user.id === userId;
		});

		return user ? user.display_name : '';
	}
}
