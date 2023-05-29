import { UserDTO } from '../../common/dtos/user-dto.model';

export class SingleChatDTO {
	id: string;
	from: UserDTO;
	to: UserDTO;

	constructor(data: SingleChatDTO) {
		this.id = data.id;
		this.from = data.from;
		this.to = data.to;
	}
}
