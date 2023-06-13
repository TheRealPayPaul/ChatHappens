import { Injectable } from '@angular/core';
import { RegisterDTO } from './register-dto.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Buffer } from 'buffer';
import { AuthTokenService } from '../common/services/token-service/auth-token.service';

/**
 * Service for authentication related methods.
 */
@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	constructor(
		private httpClient: HttpClient,
		private authTokenService: AuthTokenService
	) {}

	/**
	 * Log in user.
	 *
	 * @param email email of user
	 * @param password password of user
	 */
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

	/**
	 * Register user.
	 * @param data data of user for registration.
	 */
	register(data: RegisterDTO): Observable<RegisterDTO> {
		return this.httpClient.post('/api/authorization/register', data);
	}

	/**
	 * Logout user.
	 */
	logout(): void {
		this.authTokenService.removeToken();
	}

	/**
	 * Get if user is logged in.
	 */
	isLoggedIn(): boolean {
		return !!this.authTokenService.getToken();
	}

	/**
	 * Check if email is unique.
	 *
	 * @param email email to check.
	 */
	isEmailUnique(email: string): Observable<boolean> {
		return this.httpClient.get<boolean>(
			`/api/authorization/validate/email-unique?email=${email}`
		);
	}
}
