import { Component, Input, OnInit } from '@angular/core';
import { ProfilePictureService } from '../../services/profile-picture-service/profile-picture.service';

@Component({
	selector: 'app-profile-picture',
	templateUrl: './profile-picture.component.html',
	styleUrls: ['./profile-picture.component.scss'],
})
export class ProfilePictureComponent implements OnInit {
	image: string | null = null;

	@Input() userId: string;

	constructor(private profilePictureService: ProfilePictureService) {}

	ngOnInit(): void {
		this.profilePictureService
			.getProfilePicture(this.userId)
			.subscribe((image) => (this.image = image));
	}
}
