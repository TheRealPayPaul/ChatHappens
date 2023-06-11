import { Component, OnInit } from '@angular/core';
import { ChatStateService } from '../services/chat-state.service';
import { SingleChatDTO } from '../models/single-chat-dto.model';
import { AuthenticationService } from '../../auth/authentication.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/common/services/socket-service/socket.service';

@Component({
	selector: 'app-chat-overview',
	templateUrl: './chat-overview.component.html',
	styleUrls: ['./chat-overview.component.scss'],
})
export class ChatOverviewComponent implements OnInit {
	selectedChat: SingleChatDTO | null;
	constructor(
		private chatStateService: ChatStateService,
		private authService: AuthenticationService,
		private router: Router,
		private socketService: SocketService
	) {}

	ngOnInit(): void {
		this.chatStateService.chatSelected$.subscribe(
			(data) => (this.selectedChat = data)
		);
	}

	logout(): void {
		this.socketService.disconnect();
		this.authService.logout();
		this.router.navigateByUrl('login');
	}
}
