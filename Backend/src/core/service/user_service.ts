import { PrismaClient, User } from '@prisma/client';
import { Service } from './service';
import { UserDTO } from '../dto/user/user_dto';
import { FriendService } from '../../app/friends/friend_service';

const client = new PrismaClient();

interface UserCreateArgs {
    email: string;
    display_name: string;
    password: string;
}

interface FindOptions {
    currentUserId: string;
    excludeSelf?: boolean;
    excludeFriends?: boolean;
    displayName?: string;
}

export class UserService extends Service {
    public static async getByEmail(email: string): Promise<User | null> {
        return client.user.findUnique({
            where: {
                email,
            },
        });
    }

    public static async exists(id: string): Promise<boolean> {
        return (
            (await client.user.count({
                where: {
                    user_id: id,
                },
            })) > 0
        );
    }

    public static async emailExists(email: string): Promise<boolean> {
        const count = await client.user.count({
            where: {
                email,
            },
        });

        return count > 0;
    }

    public static async create(userArgs: UserCreateArgs): Promise<User> {
        return client.user.create({
            data: userArgs,
        });
    }

    public static async find({
        currentUserId,
        excludeSelf,
        excludeFriends,
        displayName,
    }: FindOptions): Promise<UserDTO[]> {
        const excludedUserIds: string[] = [];

        if (excludeSelf) {
            excludedUserIds.push(currentUserId);
        }

        if (excludeFriends) {
            const friendIds: string[] = (
                await FriendService.getFriends(currentUserId)
            ).map((friend) => friend.id as string);
            excludedUserIds.push(...friendIds);
        }

        return (
            await client.user.findMany({
                where: {
                    AND: [
                        {
                            NOT: {
                                user_id: {
                                    in: excludedUserIds,
                                },
                            },
                        },
                        {
                            display_name: {
                                contains: displayName ?? '',
                            },
                        },
                    ],
                },
            })
        ).map((user: User) => UserDTO.toDTO(user));
    }
}
