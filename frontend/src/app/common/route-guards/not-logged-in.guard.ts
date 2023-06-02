import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthenticationService } from '../../auth/authentication.service';

export const notLoggedIn = ():
	| Observable<boolean | UrlTree>
	| Promise<boolean | UrlTree>
	| boolean
	| UrlTree => {
	const isNotLoggedIn = !inject(AuthenticationService).isLoggedIn();
	if (!isNotLoggedIn) {
		inject(Router).navigateByUrl('/');
	}

	return isNotLoggedIn;
};
