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
import { RegisterDTO } from '../register-dto.model';
import { Router } from '@angular/router';

interface FormControlInfo {
	name: string;
	inputType: InputType;
	label: string;
	validators?: ValidatorFn[];
	asyncValidators?: AsyncValidatorFn[];
	updateOn?: string;
	trimOnBlur?: boolean;
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
		private fb: FormBuilder,
		private authenticationService: AuthenticationService,
		private router: Router
	) {
		this.formControlInfos = [
			{
				name: 'email',
				inputType: InputType.EMAIL,
				label: 'Email',
				validators: [
					Validators.required,
					Validators.email,
					Validators.maxLength(128),
				],
				asyncValidators: [
					this.isEmailUnique(this.authenticationService),
				],
				updateOn: 'blur',
				trimOnBlur: true,
			},
			{
				name: 'username',
				inputType: InputType.TEXT,
				label: 'Username',
				validators: [Validators.required, Validators.maxLength(45)],
				trimOnBlur: true,
			},
			{
				name: 'password',
				inputType: InputType.PASSWORD,
				label: 'Password',
				validators: [
					Validators.required,
					Validators.minLength(8),
					this.doesPasswordMatchPattern(),
				],
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

	register(): void {
		if (!this.areEnteredPasswordsSame()) {
			this.form.get('password')?.setErrors({ 'not-matching': true });
			return;
		}

		this.authenticationService
			.register(
				new RegisterDTO({
					email: this.form.get('email')?.value,
					display_name: this.form.get('username')?.value,
					password: this.form.get('password')?.value,
				})
			)
			.subscribe(() => {
				this.router.navigateByUrl('/chat');
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
					return isUnique ? null : { 'email-not-unique': true };
				})
			);
	}

	doesPasswordMatchPattern(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			return !new RegExp(/\s/g).test(control.value)
				? null
				: { 'password-contains-whitespace': true };
		};
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
					updateOn: control.updateOn ?? 'change',
				},
			];
		});
		return result;
	}
}
