import { Component } from '@angular/core';

@Component({
	selector: 'app-chat-overview',
	templateUrl: './chat-overview.component.html',
	styleUrls: ['./chat-overview.component.scss'],
})
export class ChatOverviewComponent {
	clickLogout(): void {
		console.log('[ChatOverview] Clicked Logout');
	}
}
