import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class CriticalErrorService {
	public handleHttpError(err: HttpErrorResponse): void {
		window.alert(
			'An unexpected error occured. The error got logged in the console. Please contact the admins.'
		);
		console.log(err);
	}
}
