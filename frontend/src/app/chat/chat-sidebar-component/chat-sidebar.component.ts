import { Component } from '@angular/core';
import { ModalService } from 'src/app/common/services/modal-service/modal.service';
import { PopupFriendsComponent } from 'src/app/popup/popup-friends/popup-friends.component';

@Component({
	selector: 'app-chat-sidebar',
	templateUrl: './chat-sidebar.component.html',
	styleUrls: ['./chat-sidebar.component.scss'],
})
export class ChatSidebarComponent {
	constructor(private modalService: ModalService) {}

	clickSettings(): void {
		console.log('[ChatSidebar] Clicked Settings');
	}
	openFriendsPopup(): void {
		this.modalService.open(PopupFriendsComponent);
	}
}
