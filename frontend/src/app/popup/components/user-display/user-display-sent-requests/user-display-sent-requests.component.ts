import { Component, Input, Output } from '@angular/core';
import { FriendRequestDTO } from '../../../../common/services/friend-request-dto.model';
import { FriendRequestService } from '../../../../common/services/friend-request-service/friend-request.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-user-display-sent-requests',
	templateUrl: './user-display-sent-requests.component.html',
	styleUrls: [
		'./user-display-sent-requests.component.scss',
		'./../user-display.scss',
	],
})
export class UserDisplaySentRequestsComponent {
	@Input() friendRequests: FriendRequestDTO[];

	@Output() friendRequestRevoked: Subject<void> = new Subject<void>();

	constructor(private friendRequestService: FriendRequestService) {}

	revokeFriendRequest(friendRequestId: string): void {
		this.friendRequestService
			.revokeFriendRequest(friendRequestId)
			.subscribe(() => {
				this.friendRequestRevoked.next();
			});
	}
}
