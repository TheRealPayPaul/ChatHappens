import { Component } from '@angular/core';
import { UserDTO } from 'src/app/common/dtos/user-dto.model';
import { ModalService } from 'src/app/common/services/modal-service/modal.service';

@Component({
	selector: 'app-popup-friends',
	templateUrl: './popup-friends.component.html',
	styleUrls: ['./popup-friends.component.scss'],
})
export class PopupFriendsComponent {
	constructor(private modalService: ModalService) {}

	searchValue: string;
	data: UserDTO[] = [
		{ id: '1', display_name: 'Tobias' },
		{ id: '2', display_name: 'Saman' },
		{ id: '3', display_name: 'Jonas' },
	];

	closePopup(): void {
		this.modalService.close();
	}

	clearSearchValue(): void {
		this.searchValue = '';
	}
}
