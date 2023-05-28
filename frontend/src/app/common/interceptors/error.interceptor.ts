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

interface ErrorInterceptorRuleset {
	[key: string]: number[];
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private criticalErrorService: CriticalErrorService) {}

	private ruleset: ErrorInterceptorRuleset = {
		'/api/authorization/login': [401],
		'/api/app/friends/requests/send': [409],
	};

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				this.testRuleset(request, error);
				this.criticalErrorService.handleHttpError(error);
				return NEVER;
			})
		);
	}

	testRuleset(request: HttpRequest<unknown>, error: HttpErrorResponse): void {
		if (!this.ruleset[request.url]) {
			return;
		}

		for (let i = 0; i < this.ruleset[request.url].length; i++) {
			const validStatusCode = this.ruleset[request.url][i];
			if (error.status === validStatusCode) throw error;
		}
	}
}
