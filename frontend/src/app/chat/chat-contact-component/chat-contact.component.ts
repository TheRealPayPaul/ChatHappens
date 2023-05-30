import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-chat-contact',
	templateUrl: './chat-contact.component.html',
	styleUrls: ['./chat-contact.component.scss'],
})
export class ChatContactComponent {
	@Input() id: string;
	@Input() name: string;
}
