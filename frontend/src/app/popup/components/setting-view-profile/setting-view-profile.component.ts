import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputType } from 'src/app/common/components/input/input-type.enum';

@Component({
	selector: 'app-setting-view-profile',
	templateUrl: './setting-view-profile.component.html',
	styleUrls: ['./setting-view-profile.component.scss'],
})
export class SettingViewProfileComponent {
	InputType: typeof InputType = InputType;
	form_display_name: FormGroup;

	constructor(private fb: FormBuilder) {
		this.form_display_name = this.fb.group({
			display_name: ['', { validators: [Validators.required] }],
		});
	}

	saveSettings(): void {
		console.log('Saved Settings');
	}
}
