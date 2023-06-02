import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

export interface TokenData {
	id: string;
	display_name: string;
	iat: number;
	exp: number;
}

/**
 * Service for handling the authentication token.
 */
@Injectable({
	providedIn: 'root',
})
export class AuthTokenService {
	private readonly AUTH_COOKIE_NAME = 'auth';

	constructor(private cookieService: CookieService) {}

	/**
	 * Get Authentication token of user.
	 */
	getToken(): string | undefined {
		return this.cookieService.get(this.AUTH_COOKIE_NAME);
	}

	/**
	 * Get data contained in the token.
	 */
	getTokenData(): TokenData {
		const token = this.getToken();
		if (!token) {
			throw new Error('No token found');
		}

		const encodedUserData: string | null =
			/^\S+\.(.+)\.\S+$/g.exec(token)?.[1] ?? null;

		return encodedUserData ? JSON.parse(atob(encodedUserData)) : null;
	}

	/**
	 * Remove authentication token.
	 */
	removeToken(): void {
		this.cookieService.remove(this.AUTH_COOKIE_NAME);
	}
}
