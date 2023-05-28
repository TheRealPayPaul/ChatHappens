import { Component, Input, Output } from '@angular/core';
import { UserDTO } from 'src/app/common/dtos/user-dto.model';
import { FriendRequestService } from '../../../../common/services/friend-request-service/friend-request.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-user-display-search',
	templateUrl: './user-display-search.component.html',
	styleUrls: [
		'./user-display-search.component.scss',
		'./../user-display.scss',
	],
})
export class UserDisplaySearchComponent {
	@Input() users: UserDTO[];

	@Output() friendRequestSent: Subject<void> = new Subject<void>();
	@Output() friendRequestAlreadyExists: Subject<void> = new Subject<void>();

	constructor(private friendRequestService: FriendRequestService) {}

	sendFriendRequest(userId: string): void {
		this.friendRequestService.sendFriendRequest(userId).subscribe({
			next: () => this.friendRequestSent.next(),
			error: () => this.friendRequestAlreadyExists.next(),
		});
	}
}
