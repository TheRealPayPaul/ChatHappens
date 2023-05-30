import { User } from '@prisma/client';

export class UserDTO {
    public id?: string;
    public display_name?: string;

    public constructor(data: Partial<UserDTO>) {
        this.id = data.id;
        this.display_name = data.display_name?.trim();
    }

    /**
     * Creates a UserDTO from the User object provided by prisma.
     *
     * @param user User from prisma
     * @returns UserDTO
     */
    public static toDTO(user: User): UserDTO {
        return new UserDTO({
            id: user.user_id,
            display_name: user.display_name,
        });
    }
}
