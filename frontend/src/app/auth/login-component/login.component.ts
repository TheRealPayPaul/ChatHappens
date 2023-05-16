import { Component } from '@angular/core';
import {
	AsyncValidatorFn,
	FormBuilder,
	FormGroup,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { InputType } from 'src/app/common/components/input/input-type.enum';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

interface FormControlInfo {
	name: string;
	inputType: InputType;
	label: string;
	validators?: ValidatorFn[];
	asyncValidators?: AsyncValidatorFn[];
}

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	form: FormGroup;
	formControlInfos: FormControlInfo[];

	constructor(
		private authenticationService: AuthenticationService,
		private fb: FormBuilder,
		private router: Router
	) {
		this.formControlInfos = [
			{
				name: 'email',
				inputType: InputType.EMAIL,
				label: 'Email',
				validators: [Validators.required, Validators.email],
			},
			{
				name: 'password',
				inputType: InputType.PASSWORD,
				label: 'Password',
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

	login(): void {
		this.authenticationService
			.login(this.form.value.email, this.form.value.password)
			.subscribe({
				next: () => {
					this.router.navigateByUrl('/chat');
				},
				error: (err: HttpErrorResponse) => {
					if (err.status === 401) {
						this.form.setErrors({ 'credentials-invalid': true });
					}
				},
			});
	}
}
