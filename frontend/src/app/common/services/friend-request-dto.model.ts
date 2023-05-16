import { UserDTO } from '../dtos/user-dto.model';

export class FriendRequestDTO {
	id: string;
	from: UserDTO;
	to: UserDTO;

	constructor(data: FriendRequestDTO) {
		this.id = data.id;
		this.from = data.from;
		this.to = data.to;
	}
}
