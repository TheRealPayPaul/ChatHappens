import { Component, Input } from '@angular/core';
import { UserDTO } from 'src/app/common/dtos/user-dto.model';

@Component({
	selector: 'app-user-display-requests',
	templateUrl: './user-display-requests.component.html',
	styleUrls: [
		'./user-display-requests.component.scss',
		'./../user-display.scss',
	],
})
export class UserDisplayRequestsComponent {
	@Input() users: UserDTO[];

	acceptUser(userId?: string): void {
		console.log(`[UserDisplayRequestsComponent] Accept user ${userId}`);
	}

	declineUser(userId?: string): void {
		console.log(`[UserDisplayRequestsComponent] Decline user ${userId}`);
	}
}
