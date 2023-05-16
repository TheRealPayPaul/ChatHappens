import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FriendRequestDTO } from '../friend-request-dto.model';

@Injectable({
	providedIn: 'root',
})
export class FriendRequestService {
	private static readonly REQUEST_URL = '/api/app/friends/requests';

	constructor(private httpClient: HttpClient) {}

	sendFriendRequest(receiverId: string): Observable<void> {
		return this.httpClient.post<void>(
			FriendRequestService.REQUEST_URL + '/send',
			{
				id: receiverId,
			}
		);
	}

	acceptFriendRequest(friendRequestId: string): Observable<void> {
		return this.httpClient.post<void>(
			FriendRequestService.REQUEST_URL + '/accept',
			{
				id: friendRequestId,
			}
		);
	}

	declineFriendRequest(friendRequestId: string): Observable<void> {
		return this.httpClient.post<void>(
			FriendRequestService.REQUEST_URL + '/decline',
			{
				id: friendRequestId,
			}
		);
	}

	getSentFriendRequests(): Observable<FriendRequestDTO[]> {
		return this.httpClient.get<FriendRequestDTO[]>(
			FriendRequestService.REQUEST_URL + '/sent'
		);
	}

	getReceivedFriendRequests(): Observable<FriendRequestDTO[]> {
		return this.httpClient.get<FriendRequestDTO[]>(
			FriendRequestService.REQUEST_URL + '/received'
		);
	}
}
