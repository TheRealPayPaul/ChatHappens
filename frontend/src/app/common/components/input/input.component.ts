import { Component, Input } from '@angular/core';
import {
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	ValidationErrors,
} from '@angular/forms';
import { InputType } from './input-type.enum';

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
	@Input() type: InputType = InputType.TEXT;
	@Input() label: string;
	@Input() errors?: ValidationErrors | null;
	@Input() infoIconPath?: string;
	@Input() trimOnBlur = false;

	onTouched: () => void;
	onChange: (val: any) => void;

	private _value: string;

	get value(): string {
		return this._value;
	}

	set value(val: string) {
		this._value = val;
		this.onChange(val);
	}

	touched(): void {
		if (this.trimOnBlur) {
			this.value = this._value.trim();
		}
		this.onTouched();
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
