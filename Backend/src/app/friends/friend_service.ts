import { PrismaClient } from '@prisma/client';
import { UserDTO } from '../../core/dto/user/user_dto';
import { ChatService } from '../chats/chat_service';

const client = new PrismaClient();

export class FriendService {
    public static async saveFriend(
        userId1: string,
        userId2: string
    ): Promise<void> {
        if (await this.isFriends(userId1, userId2)) {
            return;
        }

        await client.$transaction(async () => {
            await client.friend.create({
                data: {
                    user_1_id: userId1,
                    user_2_id: userId2,
                },
            });

            await ChatService.saveSingleChat(userId1, userId2);
        });
    }

    public static async getFriends(userId: string): Promise<UserDTO[]> {
        return (
            await client.user.findMany({
                where: {
                    AND: [
                        {
                            OR: [
                                {
                                    friend_user_1: {
                                        some: {
                                            user_2_id: userId,
                                        },
                                    },
                                },
                                {
                                    friend_user_2: {
                                        some: {
                                            user_1_id: userId,
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            NOT: {
                                user_id: userId,
                            },
                        },
                    ],
                },
            })
        ).map((user) => UserDTO.toDTO(user));
    }

    public static async isFriends(
        userId1: string,
        userId2: string
    ): Promise<boolean> {
        return (
            (await client.friend.count({
                where: {
                    OR: [
                        {
                            AND: [
                                {
                                    user_1_id: userId1,
                                },
                                {
                                    user_2_id: userId2,
                                },
                            ],
                        },
                        {
                            AND: [
                                {
                                    user_1_id: userId2,
                                },
                                {
                                    user_2_id: userId1,
                                },
                            ],
                        },
                    ],
                },
            })) > 0
        );
    }

    public static async deleteFriend(
        userId1: string,
        userId2: string
    ): Promise<void> {
        const friend = await client.friend.findFirst({
            where: {
                OR: [
                    {
                        AND: [{ user_1_id: userId1 }, { user_2_id: userId2 }],
                    },
                    {
                        AND: [{ user_1_id: userId2 }, { user_2_id: userId1 }],
                    },
                ],
            },
        });

        if (!friend) {
            return;
        }

        await client.$transaction(async () => {
            await client.friend.delete({
                where: {
                    friend_id: friend.friend_id,
                },
            });

            const chat = await ChatService.getChat(
                friend.user_1_id,
                friend.user_2_id
            );

            if (!chat) {
                throw new Error('Chat not found');
            }

            await ChatService.deleteChat(chat?.id);
        });
    }
}
