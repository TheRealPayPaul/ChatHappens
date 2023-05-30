import { Component, Input } from '@angular/core';
import { UserDTO } from '../../common/dtos/user-dto.model';

@Component({
	selector: 'app-chat-contact',
	templateUrl: './chat-contact.component.html',
	styleUrls: ['./chat-contact.component.scss'],
})
export class ChatContactComponent {
	@Input() user: UserDTO;
}
