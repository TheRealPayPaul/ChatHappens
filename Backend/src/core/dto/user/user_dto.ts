import { User } from '@prisma/client';

export class UserDTO {
    public id?: string;
    public email?: string;
    public display_name?: string;
    public password?: string;
    public profile_picture?: string;
    public created_on?: string;

    public constructor(data: Partial<UserDTO>) {
        this.id = data.id;
        this.email = data.email;
        this.display_name = data.display_name?.trim();
        this.password = data.password;
        this.profile_picture = data.profile_picture;
        this.created_on = data.created_on;
    }

    /**
     * Creates a UserDTO from the User object provided by prisma.
     *
     * @param user User from prisma
     * @returns UserDTO
     */
    public static createFromDB(user: User): UserDTO {
        return new UserDTO({
            id: user.user_id,
            email: user.email,
            display_name: user.display_name,
            profile_picture: user.profile_picture ?? undefined,
            created_on: user.profile_picture ?? undefined,
        });
    }
}
