import { Injectable } from '@angular/core';
import { ErrorKeyMap } from './error-key-map';

@Injectable({
	providedIn: 'root',
})
export class ErrorMessageService {
	private errorKeyMap: { [key: string]: string } = ErrorKeyMap;

	getMessage(key: string, params?: string[]): string {
		let result = this.errorKeyMap[key];

		if (!result) {
			return key;
		}

		params?.forEach(
			(param: string) => (result = result.replace('{}', param))
		);

		return result;
	}
}
