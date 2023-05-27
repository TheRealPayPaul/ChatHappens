import { Injectable } from '@angular/core';
import { SocketService } from '../socket-service/socket.service';
import { Observable, Subject } from 'rxjs';

export interface UserStatusDTO {
	id: string;
	online: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class UserStatusService {
	constructor(private socketService: SocketService) {
		socketService.on('isOnline', (data: UserStatusDTO) => {
			this.dataSource.next(data);
		});
	}

	private dataSource = new Subject<UserStatusDTO>();

	public getObservable(): Observable<UserStatusDTO> {
		return this.dataSource.asObservable();
	}
}
