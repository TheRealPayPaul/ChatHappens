import { Component } from '@angular/core';
import {
	AbstractControl,
	AsyncValidatorFn,
	FormBuilder,
	FormGroup,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { map, Observable } from 'rxjs';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	form: FormGroup;

	constructor(
		private authenticationService: AuthenticationService,
		private fb: FormBuilder
	) {
		this.form = this.fb.group({
			email: [
				'',
				{
					validators: [Validators.required, Validators.email],
					asyncValidators: [
						this.isEmailUnique(this.authenticationService),
					],
				},
			],
			username: ['', [Validators.required]],
			password: ['', [Validators.required]],
			repeatPassword: ['', [Validators.required]],
		});
	}

	register() {
		if (!this.areEnteredPasswordsSame()) {
			this.form.get('password')?.setErrors({ 'not-matching': true });
			return;
		}

		this.authenticationService
			.register(this.form.value)
			.subscribe((data) => {
				console.log('registered');
				/*
                TODO
                    login user
                    redirect to chat page
                 */
			});
	}

	areEnteredPasswordsSame(): boolean {
		const password = this.form.get('password')?.value;
		const repeatedPassword = this.form.get('repeat-password')?.value;

		return password == repeatedPassword;
	}

	isEmailUnique(
		authenticationService: AuthenticationService
	): AsyncValidatorFn {
		return (
			control: AbstractControl
		): Observable<ValidationErrors | null> =>
			authenticationService.isEmailUnique(control.value).pipe(
				map((isUnique: boolean) => {
					return isUnique ? null : { 'not-unique': true };
				})
			);
	}
}
