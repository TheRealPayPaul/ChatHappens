import { Component, Input, Output } from '@angular/core';
import { FriendRequestDTO } from '../../../../common/services/friend-request-dto.model';
import { FriendRequestService } from '../../../../common/services/friend-request-service/friend-request.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-user-display-received-requests',
	templateUrl: './user-display-received-requests.component.html',
	styleUrls: [
		'./user-display-received-requests.component.scss',
		'./../user-display.scss',
	],
})
export class UserDisplayReceivedRequestsComponent {
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
