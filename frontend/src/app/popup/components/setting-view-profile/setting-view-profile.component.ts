import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputType } from 'src/app/common/components/input/input-type.enum';
import { SettingsService } from '../../services/settings.service';
import { ProfilePictureService } from 'src/app/common/services/profile-picture-service/profile-picture.service';

@Component({
	selector: 'app-setting-view-profile',
	templateUrl: './setting-view-profile.component.html',
	styleUrls: ['./setting-view-profile.component.scss'],
})
export class SettingViewProfileComponent {
	InputType: typeof InputType = InputType;
	form_display_name: FormGroup;

	constructor(
		private fb: FormBuilder,
		private settingsService: SettingsService,
		private profilePictureService: ProfilePictureService
	) {
		this.form_display_name = this.fb.group({
			display_name: ['', { validators: [Validators.required] }],
		});
	}

	setProfilePicture(e: any): void {
		this.profilePictureService
			.setProfilePicture(e.target.files[0])
			.subscribe({
				next: () => {
					alert('Profile picture got uploaded');
				},
			});
	}

	saveSettingsDisplayName(): void {
		if (!this.form_display_name.valid) return;

		const newDisplayName =
			this.form_display_name.get('display_name')?.value;
		if (!newDisplayName) return;

		this.settingsService.updateDisplayName(newDisplayName).subscribe({
			next: () => {
				this.form_display_name.reset();
			},
		});
	}
}
