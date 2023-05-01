import { Injectable } from '@angular/core';
import { UserDTO } from './user-dto.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Buffer } from 'buffer';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	constructor(private httpClient: HttpClient) {}

	login(data: UserDTO): Observable<any> {
		const credentials = `${data.email}:${data.password}`;

		const headers = new HttpHeaders().set(
			'Authorization',
			`Basic ${Buffer.from(credentials).toString('base64')}`
		);
		return this.httpClient.post('/api/authorization/login', null, {
			headers,
		});
	}

	register(data: UserDTO): Observable<UserDTO> {
		return this.httpClient.post('/api/authorization/register', data);
	}

	isEmailUnique(toCheck: string): Observable<boolean> {
		return of(true);
	}
}
