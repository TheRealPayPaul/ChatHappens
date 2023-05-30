import { Component } from '@angular/core';
import { SocketService } from 'src/app/common/services/socket-service/socket.service';

@Component({
	selector: 'app-chat-overview',
	templateUrl: './chat-overview.component.html',
	styleUrls: ['./chat-overview.component.scss'],
})
export class ChatOverviewComponent {
	constructor(private socketService: SocketService) {}

	clickLogout(): void {
		this.socketService.send('hello', { msg: 'huhu' });
		console.log('[ChatOverview] Clicked Logout');
	}
}
