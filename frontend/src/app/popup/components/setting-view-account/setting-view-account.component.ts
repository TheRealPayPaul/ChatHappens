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
import { SettingsService } from '../../services/settings.service';

@Component({
	selector: 'app-setting-view-account',
	templateUrl: './setting-view-account.component.html',
	styleUrls: ['./setting-view-account.component.scss'],
})
export class SettingViewAccountComponent {
	InputType: typeof InputType = InputType;
	form_email: FormGroup;
	form_password: FormGroup;

	constructor(
		private fb: FormBuilder,
		private settingsService: SettingsService
	) {
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

	saveSettingsPassword(): void {
		if (!this.form_password.valid) return;

		if (!this.areEnteredPasswordsSame()) {
			this.form_password.setErrors({ 'not-matching': true });
			return;
		}

		const newPassword = this.form_password.get('new_password')?.value;
		if (!newPassword) return;

		this.settingsService.updatePassword(newPassword).subscribe({
			next: () => {
				this.form_password.reset();
			},
		});
	}

	saveSettingsEmail(): void {
		if (!this.form_email.valid) return;

		const newEmail = this.form_email.get('email')?.value;
		if (!newEmail) return;

		this.settingsService.updateEmail(newEmail).subscribe({
			next: () => {
				this.form_email.reset();
			},
		});
	}
}
