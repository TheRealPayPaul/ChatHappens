import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../../dtos/user-dto.model';
import { AuthTokenService } from '../token-service/auth-token.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(
		private httpClient: HttpClient,
		private authTokenService: AuthTokenService
	) {}

	/**
	 * Get all users which are not friends with current user and have no open
	 * friend request with current user.
	 *
	 * @param name name to filter users by.
	 */
	searchForPotentialFriends(name: string): Observable<UserDTO[]> {
		return this.httpClient.get<UserDTO[]>(
			`/api/app/users/search?excludeFriends=true&excludeSelf=true&displayName=${name}`
		);
	}

	/**
	 * Get id of current user.
	 */
	getCurrentUserId(): string {
		return this.authTokenService.getTokenData().id;
	}
}
