import { Component } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	ValidationErrors,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { InputType } from 'src/app/common/components/input/input-type.enum';

@Component({
	selector: 'app-setting-view-account',
	templateUrl: './setting-view-account.component.html',
	styleUrls: ['./setting-view-account.component.scss'],
})
export class SettingViewAccountComponent {
	InputType: typeof InputType = InputType;
	form_email: FormGroup;
	form_password: FormGroup;

	constructor(private fb: FormBuilder) {
		this.form_email = this.fb.group({
			email: [
				'',
				{ validators: [Validators.required, Validators.email] },
			],
		});

		this.form_password = this.fb.group({
			new_password: [
				'',
				{
					validators: [
						Validators.required,
						Validators.minLength(8),
						this.doesPasswordMatchPattern(),
					],
				},
			],
			repeat_password: ['', { validators: [Validators.required] }],
		});
	}

	doesPasswordMatchPattern(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			return !new RegExp(/\s/g).test(control.value)
				? null
				: { 'password-contains-whitespace': true };
		};
	}

	areEnteredPasswordsSame(): boolean {
		const newPassword = this.form_password.get('new_password')?.value;
		const repeatedPassword =
			this.form_password.get('repeat_password')?.value;

		return newPassword === repeatedPassword;
	}

	saveSettings(): void {
		console.log('Saved Settings');
	}

	saveSettingsPassword(): void {
		if (!this.areEnteredPasswordsSame()) {
			this.form_password.setErrors({ 'not-matching': true });
			return;
		}

		console.log('Saved Password');
	}
}
