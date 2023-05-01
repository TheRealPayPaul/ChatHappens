import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'toStringArray',
})
export class ToStringArrayPipe implements PipeTransform {
	transform(value: any): string[] {
		let result;

		if (Array.isArray(value)) {
			result = value;
		} else if (typeof value === 'object' && value !== null) {
			result = Object.values(value);
		} else {
			result = [value];
		}

		return result.map((element: any) => element?.toString());
	}
}
