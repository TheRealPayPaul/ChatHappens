import { UserDTO } from '../../../../core/dto/user/user_dto';
import { FriendRequest, User } from '@prisma/client';

export class FriendRequestDTO {
    from: UserDTO;
    to: UserDTO;

    constructor(from: UserDTO, to: UserDTO) {
        this.from = from;
        this.to = to;
    }

    public static toDTO(
        data: FriendRequest & { from: User; to: User }
    ): FriendRequestDTO {
        return new FriendRequestDTO(
            UserDTO.toDTO(data.from),
            UserDTO.toDTO(data.to)
        );
    }
}
