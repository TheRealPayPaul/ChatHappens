import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthenticationService } from '../../auth/authentication.service';

export const loggedIn = ():
	| Observable<boolean | UrlTree>
	| Promise<boolean | UrlTree>
	| boolean
	| UrlTree => {
	const isLoggedIn = inject(AuthenticationService).isLoggedIn();
	if (!isLoggedIn) {
		inject(Router).navigateByUrl('/login');
	}

	return isLoggedIn;
};
