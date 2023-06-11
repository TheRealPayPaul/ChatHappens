import { Component, Input } from '@angular/core';
import { MessageService } from '../services/message.service';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-chat-input-bar',
	templateUrl: './chat-input-bar.component.html',
	styleUrls: ['./chat-input-bar.component.scss'],
})
export class ChatInputBarComponent {
	constructor(private messageService: MessageService) {}

	@Input() chatId: string | null;
	messageFormControl = new FormControl('', {
		nonNullable: true,
	});

	clickSend(): void {
		if (!this.chatId) return;
		if (this.messageFormControl.value.length <= 0) return;

		this.messageService.sendMessage(
			this.chatId,
			this.messageFormControl.value
		);
		this.messageFormControl.setValue('');
	}

	clickEmoticon(): void {
		console.log('[ChatInputBar] Clicked Emoticon');
	}
}
