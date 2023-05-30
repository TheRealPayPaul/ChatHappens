import { Component, OnInit } from '@angular/core';
import { ChatStateService } from '../chat-state.service';
import { SingleChatDTO } from '../models/single-chat-dto.model';
import { AuthenticationService } from '../../auth/authentication.service';
import { Router } from '@angular/router';

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
		private router: Router
	) {}

	ngOnInit(): void {
		this.chatStateService.chatSelected$.subscribe(
			(data) => (this.selectedChat = data)
		);
	}

	logout(): void {
		this.authService.logout();
		this.router.navigateByUrl('login');
	}
}
