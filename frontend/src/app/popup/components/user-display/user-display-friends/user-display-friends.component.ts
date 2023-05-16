import { Component, Input, Output } from '@angular/core';
import { UserDTO } from 'src/app/common/dtos/user-dto.model';
import { FriendService } from '../../../../common/services/friend-service/friend.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-user-display-friends',
	templateUrl: './user-display-friends.component.html',
	styleUrls: [
		'./user-display-friends.component.scss',
		'./../user-display.scss',
	],
})
export class UserDisplayFriendsComponent {
	@Input() users: UserDTO[];

	@Output() removedFriend: Subject<void> = new Subject<void>();

	constructor(private friendService: FriendService) {}

	removeUser(userId: string): void {
		this.friendService
			.deleteFriend(userId)
			.subscribe(() => this.removedFriend.next());
	}
}
