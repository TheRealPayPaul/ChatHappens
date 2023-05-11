import { Component } from '@angular/core';

@Component({
	selector: 'app-chat-input-bar',
	templateUrl: './chat-input-bar.component.html',
	styleUrls: ['./chat-input-bar.component.scss'],
})
export class ChatInputBarComponent {
	clickImport(): void {
		console.log('[ChatInputBar] Clicked Import');
	}
	clickEmoticon(): void {
		console.log('[ChatInputBar] Clicked Emoticon');
	}
	clickSend(): void {
		console.log('[ChatInputBar] Clicked Send');
	}
}
