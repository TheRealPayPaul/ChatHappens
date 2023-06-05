import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/common/services/modal-service/modal.service';
import { PopupFriendsComponent } from 'src/app/popup/popup-friends/popup-friends.component';
import { SingleChatDTO } from '../models/single-chat-dto.model';
import { ChatService } from '../services/chat.service';
import { ChatStateService } from '../services/chat-state.service';

@Component({
	selector: 'app-chat-sidebar',
	templateUrl: './chat-sidebar.component.html',
	styleUrls: ['./chat-sidebar.component.scss'],
})
export class ChatSidebarComponent implements OnInit {
	chats: SingleChatDTO[] = [];
	selectedChatId: string | null;

	constructor(
		private modalService: ModalService,
		private chatService: ChatService,
		private chatStateService: ChatStateService
	) {}

	ngOnInit(): void {
		this.chatService.getChats().subscribe((data) => (this.chats = data));
		this.chatStateService.chatSelected$.subscribe((data) => {
			this.selectedChatId = data?.id ?? null;
		});
	}

	selectChat(chat: SingleChatDTO): void {
		this.chatStateService.selectChat(chat);
	}

	clickSettings(): void {
		console.log('[ChatSidebar] Clicked Settings');
	}

	openFriendsPopup(): void {
		this.modalService.open(PopupFriendsComponent);
	}
}
