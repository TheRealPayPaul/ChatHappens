import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/common/services/modal-service/modal.service';
import { PopupFriendsComponent } from 'src/app/popup/popup-friends/popup-friends.component';
import { SingleChatDTO } from '../models/single-chat-dto.model';
import { ChatService } from '../services/chat.service';
import { ChatStateService } from '../services/chat-state.service';
import { ProfilePictureService } from '../../common/services/profile-picture-service/profile-picture.service';
import { UserService } from '../../common/services/user-service/user.service';

@Component({
	selector: 'app-chat-sidebar',
	templateUrl: './chat-sidebar.component.html',
	styleUrls: ['./chat-sidebar.component.scss'],
})
export class ChatSidebarComponent implements OnInit {
	chats: SingleChatDTO[] = [];
	selectedChatId: string | null;

	currentUserId: string;

	setProfilePicture(e: any): any {
		this.profilePictureService
			.setProfilePicture(e.target.files[0])
			.subscribe();
	}

	constructor(
		private profilePictureService: ProfilePictureService,
		private modalService: ModalService,
		private chatService: ChatService,
		private chatStateService: ChatStateService,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.chatService.getChats().subscribe((data) => (this.chats = data));
		this.chatStateService.chatSelected$.subscribe((data) => {
			this.selectedChatId = data?.id ?? null;
		});

		this.currentUserId = this.userService.getCurrentUserId();
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
