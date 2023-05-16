import { Injectable } from '@angular/core';
import { RegisterDTO } from './register-dto.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Buffer } from 'buffer';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	constructor(private httpClient: HttpClient) {}

	login(email: string, password: string): Observable<void> {
		const credentials = `${email}:${password}`;

		const headers = new HttpHeaders().set(
			'Authorization',
			`Basic ${Buffer.from(credentials).toString('base64')}`
		);
		return this.httpClient.post<void>('/api/authorization/login', null, {
			headers,
		});
	}

	register(data: RegisterDTO): Observable<RegisterDTO> {
		return this.httpClient.post('/api/authorization/register', data);
	}

	/**
	 * Check if email is unique.
	 * @param email email to check.
	 */
	isEmailUnique(email: string): Observable<boolean> {
		return this.httpClient.get<boolean>(
			`/api/authorization/validate/email-unique?email=${email}`
		);
	}
}
