import { Component, Input } from '@angular/core';
import {
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	ValidationErrors,
} from '@angular/forms';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: InputComponent,
			multi: true,
		},
	],
})
export class InputComponent implements ControlValueAccessor {
	@Input() type: string = 'text'; // TODO create enum with types
	@Input() label: string;
	@Input() errors?: ValidationErrors | null;

	onChange: (val: any) => {};
	onTouched: (val: any) => {};

	private _value: string;

	get value(): string {
		return this._value;
	}

	set value(val: string) {
		this._value = val;
		this.onChange(val);
		this.onTouched(val);
	}

	writeValue(value: any): void {
		this._value = value;
	}

	registerOnChange(onChange: any): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: any): void {
		this.onTouched = onTouched;
	}
}
