import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/common/dtos/user-dto.model';
import { ModalService } from 'src/app/common/services/modal-service/modal.service';
import { FriendRequestDTO } from '../../common/services/friend-request-dto.model';
import { FriendService } from '../../common/services/friend-service/friend.service';
import { FriendRequestService } from '../../common/services/friend-request-service/friend-request.service';
import { UserService } from '../../common/services/user-service/user.service';

@Component({
	selector: 'app-popup-friends',
	templateUrl: './popup-friends.component.html',
	styleUrls: ['./popup-friends.component.scss'],
})
export class PopupFriendsComponent implements OnInit {
	constructor(
		private modalService: ModalService,
		private friendService: FriendService,
		private friendRequestService: FriendRequestService,
		private userService: UserService
	) {}

	searchValue: string;
	searchResults: UserDTO[] = [];

	receivedFriendRequests: FriendRequestDTO[] = [];
	sentFriendRequests: FriendRequestDTO[] = [];
	friends: UserDTO[] = [];

	ngOnInit(): void {
		this.fetchFriends();
		this.fetchReceivedFriendRequests();
		this.fetchSentFriendRequests();
	}

	fetchReceivedFriendRequests(): void {
		this.friendRequestService
			.getReceivedFriendRequests()
			.subscribe(
				(friendsRequests) =>
					(this.receivedFriendRequests = friendsRequests)
			);
	}

	fetchSentFriendRequests(): void {
		this.friendRequestService
			.getSentFriendRequests()
			.subscribe(
				(friendsRequests) => (this.sentFriendRequests = friendsRequests)
			);
	}

	fetchFriends(): void {
		this.friendService
			.getFriends()
			.subscribe((friends) => (this.friends = friends));
	}

	searchValueChanged(): void {
		this.searchResults = [];
		if (!this.searchValue) {
			return;
		}

		this.userService
			.searchForPotentialFriends(this.searchValue)
			.subscribe((result) => (this.searchResults = result));
	}

	closePopup(): void {
		this.modalService.close();
	}

	clearSearchValue(): void {
		this.searchValue = '';
	}

	displayError(message: string): void {
		alert(message);
	}
}
