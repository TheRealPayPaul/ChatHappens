import { UserDTO } from '../../core/dto/user/user_dto';

export class SingleChatDTO {
    id: string;
    from: UserDTO;
    to: UserDTO;

    constructor(data: SingleChatDTO) {
        this.id = data.id;
        this.from = data.from;
        this.to = data.to;
    }

    static toDTO(id: string, to: UserDTO, from: UserDTO): SingleChatDTO {
        return new SingleChatDTO({ id, to, from });
    }
}
