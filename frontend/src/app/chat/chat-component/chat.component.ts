import { Component, OnInit } from '@angular/core';
import { ChatStateService } from '../chat-state.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
	chatId: string | null;

	constructor(private chatStateService: ChatStateService) {}

	ngOnInit(): void {
		this.chatStateService.chatSelected$.subscribe(
			(data) => (this.chatId = data?.id ?? null)
		);
	}
}
