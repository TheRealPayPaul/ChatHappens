import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SettingsService {
	constructor(private httpClient: HttpClient) {}

	updatePassword(newPassword: string): Observable<void> {
		return this.httpClient.put<void>(`/api/app/settings/password`, {
			password: newPassword,
		});
	}

	updateEmail(newEmail: string): Observable<void> {
		return this.httpClient.put<void>(`/api/app/settings/email`, {
			email: newEmail,
		});
	}

	updateDisplayName(newDisplayName: string): Observable<void> {
		return this.httpClient.put<void>(`/api/app/settings/displayname`, {
			displayName: newDisplayName,
		});
	}
}
