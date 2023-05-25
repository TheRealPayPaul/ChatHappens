import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../../dtos/user-dto.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private httpClient: HttpClient) {}

	searchForPotentialFriends(name: string): Observable<UserDTO[]> {
		return this.httpClient.get<UserDTO[]>(
			`/api/app/users/search?excludeFriends=true&excludeSelf=true&displayName=${name}`
		);
	}
}
