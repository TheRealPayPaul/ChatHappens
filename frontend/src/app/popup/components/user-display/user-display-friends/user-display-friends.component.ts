import { Component, Input } from '@angular/core';
import { UserDTO } from 'src/app/common/dtos/user-dto.model';

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

	removeUser(userId?: string): void {
		console.log(`[UserDisplayFriendsComponent] Remove user ${userId}`);
	}
}
