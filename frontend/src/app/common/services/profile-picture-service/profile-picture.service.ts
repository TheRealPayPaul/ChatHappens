import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProfilePictureService {
	constructor(private httpClient: HttpClient) {}

	setProfilePicture(image: File): Observable<void> {
		const data = new FormData();
		data.append('image', image);

		return this.httpClient.post<void>(
			`/api/app/users/profile-picture`,
			data
		);
	}

	getProfilePicture(userId: string): Observable<string> {
		return this.httpClient.get(
			`/api/app/users/profile-picture?id=${userId}`,
			{
				responseType: 'text',
			}
		);
	}
}
