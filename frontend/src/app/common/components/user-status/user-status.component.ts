import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket-service/socket.service';
import {
	UserStatusDTO,
	UserStatusService,
} from '../../services/user-status-service/user-status.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-user-status[userId]',
	templateUrl: './user-status.component.html',
	styleUrls: ['./user-status.component.scss'],
})
export class UserStatusComponent implements OnInit, OnDestroy {
	constructor(
		private socketService: SocketService,
		private userStatusService: UserStatusService
	) {}

	@Input() userId: string;
	dataSubscription: Subscription;
	isOnline = false;

	ngOnInit(): void {
		// Subscribe to user-status changes
		this.dataSubscription = this.userStatusService
			.getObservable()
			.subscribe((userStatus: UserStatusDTO) => {
				if (userStatus.id != this.userId) return;

				this.isOnline = userStatus.online;
			});
		// Request a user-status change message from the server
		// For a specified id
		this.socketService.send('isOnline', { id: this.userId });
	}

	ngOnDestroy(): void {
		// Unsubscribe to user-status changes
		this.dataSubscription.unsubscribe();
	}
}
