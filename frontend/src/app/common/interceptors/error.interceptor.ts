import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { catchError, NEVER, Observable } from 'rxjs';
import { CriticalErrorService } from '../services/critical-error/critical-error.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication.service';

interface ErrorInterceptorRuleset {
	[key: string]: number[];
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(
		private criticalErrorService: CriticalErrorService,
		private authService: AuthenticationService,
		private router: Router
	) {}

	private ruleset: ErrorInterceptorRuleset = {
		'/api/authorization/login': [418],
		'/api/app/friends/requests/send': [409],
	};

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401) {
					this.authService.logout();
					this.router.navigateByUrl('/login');
					return NEVER;
				}

				if (this.isErrorAllowed(request, error)) {
					throw error;
				}

				this.criticalErrorService.handleHttpError(error);
				return NEVER;
			})
		);
	}

	isErrorAllowed(
		request: HttpRequest<unknown>,
		error: HttpErrorResponse
	): boolean {
		if (!this.ruleset[request.url]) {
			return false;
		}

		for (let i = 0; i < this.ruleset[request.url].length; i++) {
			const validStatusCode = this.ruleset[request.url][i];
			if (error.status === validStatusCode) {
				return true;
			}
		}

		return false;
	}
}
