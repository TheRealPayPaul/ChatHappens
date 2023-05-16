import { Component, Input, Output } from '@angular/core';
import { FriendRequestDTO } from '../../../../common/services/friend-request-dto.model';
import { FriendRequestService } from '../../../../common/services/friend-request-service/friend-request.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-user-display-requests',
	templateUrl: './user-display-requests.component.html',
	styleUrls: [
		'./user-display-requests.component.scss',
		'./../user-display.scss',
	],
})
export class UserDisplayRequestsComponent {
	@Input() friendRequests: FriendRequestDTO[];

	@Output() friendRequestAccepted: Subject<void> = new Subject<void>();
	@Output() friendRequestDeclined: Subject<void> = new Subject<void>();

	constructor(private friendRequestService: FriendRequestService) {}

	acceptFriendRequest(friendRequestId: string): void {
		this.friendRequestService
			.acceptFriendRequest(friendRequestId)
			.subscribe(() => {
				this.friendRequestAccepted.next();
			});
	}

	declineFriendRequest(friendRequestId: string): void {
		this.friendRequestService
			.declineFriendRequest(friendRequestId)
			.subscribe(() => {
				this.friendRequestDeclined.next();
			});
	}
}
