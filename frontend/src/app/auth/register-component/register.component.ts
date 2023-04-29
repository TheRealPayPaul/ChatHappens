import { Component } from '@angular/core';
import {
	AbstractControl,
	AsyncValidatorFn,
	FormBuilder,
	FormGroup,
	ValidationErrors,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { map, Observable } from 'rxjs';
import { InputType } from '../../common/components/input/input-type.enum';

interface FormControlInfo {
	name: string;
	inputType: InputType;
	label: string;
	validators?: ValidatorFn[];
	asyncValidators?: AsyncValidatorFn[];
}

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	form: FormGroup;
	formControlInfos: FormControlInfo[];

	constructor(
		private authenticationService: AuthenticationService,
		private fb: FormBuilder
	) {
		this.formControlInfos = [
			{
				name: 'email',
				inputType: InputType.EMAIL,
				label: 'Email',
				validators: [Validators.required, Validators.email],
				asyncValidators: [
					this.isEmailUnique(this.authenticationService),
				],
			},
			{
				name: 'username',
				inputType: InputType.TEXT,
				label: 'Username',
				validators: [Validators.required],
			},
			{
				name: 'password',
				inputType: InputType.PASSWORD,
				label: 'Password',
				validators: [Validators.required],
			},
			{
				name: 'repeatPassword',
				inputType: InputType.PASSWORD,
				label: 'Repeat password',
				validators: [Validators.required],
			},
		];

		this.form = this.fb.group(
			this.getFormGroupConfigFromInfo(this.formControlInfos)
		);
	}

	private getFormGroupConfigFromInfo(
		formControlsInfo: FormControlInfo[]
	): any {
		const result: { [name: string]: any[] } = {};
		formControlsInfo.forEach((control: FormControlInfo) => {
			result[control.name] = [
				'',
				{
					validators: control.validators,
					asyncValidators: control.asyncValidators,
				},
			];
		});
		return result;
	}

	register() {
		if (!this.areEnteredPasswordsSame()) {
			this.form.get('password')?.setErrors({ 'not-matching': true });
			return;
		}

		this.authenticationService.register(this.form.value).subscribe(() => {
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
		const repeatedPassword = this.form.get('repeatPassword')?.value;

		return password === repeatedPassword;
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
