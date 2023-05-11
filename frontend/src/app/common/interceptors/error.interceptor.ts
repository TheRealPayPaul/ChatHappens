import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import { NEVER, Observable, catchError } from 'rxjs';
import { CriticalErrorService } from '../services/critical-error/critical-error.service';

interface ErrorInterceptorRuleset {
	[key: string]: number[];
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private ces: CriticalErrorService) {}

	private ruleset: ErrorInterceptorRuleset = {
		'/api/authorization/login': [401],
	};

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				this.testRuleset(request, error);
				this.ces.handleHttpError(error);
				return NEVER;
			})
		);
	}

	testRuleset(request: HttpRequest<unknown>, error: HttpErrorResponse): void {
		for (let i = 0; i < this.ruleset[request.url].length; i++) {
			const validStatusCode = this.ruleset[request.url][i];
			if (error.status === validStatusCode) throw error;
		}
	}
}
