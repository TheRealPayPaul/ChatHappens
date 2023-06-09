import { UserDTO } from '../../../../core/dto/user/user_dto';
import { FriendRequest, User } from '@prisma/client';

export class FriendRequestDTO {
    id: string;
    from: UserDTO;
    to: UserDTO;

    constructor(id: string, from: UserDTO, to: UserDTO) {
        this.id = id;
        this.from = from;
        this.to = to;
    }

    public static toDTO(
        data: FriendRequest & { from: User; to: User }
    ): FriendRequestDTO {
        return new FriendRequestDTO(
            data.friend_request_id,
            UserDTO.toDTO(data.from),
            UserDTO.toDTO(data.to)
        );
    }
}
