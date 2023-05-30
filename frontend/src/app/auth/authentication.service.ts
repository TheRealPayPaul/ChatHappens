import { Injectable } from '@angular/core';
import { RegisterDTO } from './register-dto.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Buffer } from 'buffer';
import { CookieService } from 'ngx-cookie';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	private readonly AUTH_COOKIE_NAME = 'auth';

	constructor(
		private httpClient: HttpClient,
		private cookieService: CookieService
	) {}

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
	 * Logout user.
	 */
	logout(): void {
		this.cookieService.remove(this.AUTH_COOKIE_NAME);
	}

	/**
	 * Get if user is logged in.
	 */
	isLoggedIn(): boolean {
		return !!this.cookieService.get(this.AUTH_COOKIE_NAME);
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
