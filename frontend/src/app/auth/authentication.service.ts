import { Injectable } from '@angular/core';
import { UserDTO } from './user-dto.model';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	constructor() {}

	register(data: UserDTO): Observable<any> {
		console.log('register user', data);
		return of(null);
	}

	isEmailUnique(toCheck: string): Observable<boolean> {
		return of(true);
	}
}
