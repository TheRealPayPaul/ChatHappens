import { Component, Input, OnInit } from '@angular/core';
import { MessageDTO } from '../models/message-dto.model';
import { Sender } from 'src/app/common/enums/Sender';

@Component({
	selector: 'app-chat-message-bubble',
	templateUrl: './chat-message-bubble.component.html',
	styleUrls: ['./chat-message-bubble.component.scss'],
})
export class ChatMessageBubbleComponent implements OnInit {
	@Input() message: MessageDTO;
	@Input() username: string;
	self = Sender.Self;
	date = '';

	ngOnInit(): void {
		this.parseDateToString(this.message.timestamp);
	}

	parseDateToString(timestamp: string): void {
		const today = new Date();
		const messageDate = new Date(Date.parse(timestamp));

		if (today.setHours(0, 0, 0, 0) === messageDate.setHours(0, 0, 0, 0)) {
			this.date = 'Today';
			return;
		}

		this.date = messageDate.toLocaleDateString('de-DE', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
	}
}
