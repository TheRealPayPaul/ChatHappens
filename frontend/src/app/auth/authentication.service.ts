import { Injectable } from '@angular/core';
import { UserDTO } from './user-dto.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	constructor(private httpClient: HttpClient) {}

	register(data: UserDTO): Observable<UserDTO> {
		return this.httpClient.post('/api/authorization/register', data);
	}

	isEmailUnique(toCheck: string): Observable<boolean> {
		return of(true);
	}
}
