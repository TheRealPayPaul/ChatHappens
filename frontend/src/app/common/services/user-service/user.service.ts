import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../../dtos/user-dto.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private httpClient: HttpClient) {}

	searchForUser(): Observable<UserDTO[]> {
		return this.httpClient.get<UserDTO[]>('/api/app/users/search');
	}
}
