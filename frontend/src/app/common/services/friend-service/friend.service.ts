import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../../dtos/user-dto.model';

@Injectable({
	providedIn: 'root',
})
export class FriendService {
	constructor(private httpClient: HttpClient) {}

	getFriends(): Observable<UserDTO[]> {
		return this.httpClient.get<UserDTO[]>('/api/app/friends');
	}

	deleteFriend(userId: string): Observable<void> {
		return this.httpClient.delete<void>('/api/app/friends', {
			body: {
				id: userId,
			},
		});
	}
}
