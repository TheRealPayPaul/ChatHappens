import { Component } from '@angular/core';

@Component({
	selector: 'app-chat-sidebar',
	templateUrl: './chat-sidebar.component.html',
	styleUrls: ['./chat-sidebar.component.scss'],
})
export class ChatSidebarComponent {
	clickAddFriend(): void {
		console.log('[ChatSidebar] Clicked AddFriend');
	}
	clickSettings(): void {
		console.log('[ChatSidebar] Clicked Settings');
	}
}
