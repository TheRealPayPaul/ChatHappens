import { Component, Input } from '@angular/core';
import { UserDTO } from 'src/app/common/dtos/user-dto.model';

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

	requestUser(userId?: string): void {
		console.log(`[UserDisplaySearchComponent] Request user ${userId}`);
	}
}
