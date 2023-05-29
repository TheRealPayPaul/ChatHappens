import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/common/services/socket-service/socket.service';
import { ChatStateService } from '../chat-state.service';
import { SingleChatDTO } from '../models/single-chat-dto.model';

@Component({
	selector: 'app-chat-overview',
	templateUrl: './chat-overview.component.html',
	styleUrls: ['./chat-overview.component.scss'],
})
export class ChatOverviewComponent implements OnInit {
	selectedChat: SingleChatDTO | null;
	constructor(
		private socketService: SocketService,
		private chatStateService: ChatStateService
	) {}

	ngOnInit(): void {
		this.chatStateService.chatSelected$.subscribe(
			(data) => (this.selectedChat = data)
		);
	}

	clickLogout(): void {
		this.socketService.send('hello', { msg: 'huhu' });
		console.log('[ChatOverview] Clicked Logout');
	}
}
