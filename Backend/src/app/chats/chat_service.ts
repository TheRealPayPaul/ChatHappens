import { PrismaClient } from '@prisma/client';
import { SingleChatDTO } from './single_chat_dto';

const client = new PrismaClient();

export class ChatService {
    static async saveSingleChat(
        userId1: string,
        userId2: string
    ): Promise<void> {
        await client.singleChat.create({
            data: {
                user_1_id: userId1,
                user_2_id: userId2,
            },
        });
    }

    static async getChats(userId: string): Promise<SingleChatDTO[]> {
        return (
            await client.singleChat.findMany({
                where: {
                    OR: [{ user_1_id: userId }, { user_2_id: userId }],
                },
            })
        ).map((entry) => {
            const from =
                entry.user_1_id === userId ? entry.user_1_id : entry.user_2_id;
            const to =
                entry.user_1_id === userId ? entry.user_2_id : entry.user_1_id;

            return SingleChatDTO.toDTO(entry.chat_id, to, from);
        });
    }

    static async getChat(
        user1Id: string,
        user2Id: string
    ): Promise<SingleChatDTO | null> {
        const chat = await client.singleChat.findFirst({
            where: {
                OR: [
                    {
                        AND: [
                            {
                                user_1_id: user1Id,
                            },
                            {
                                user_2_id: user2Id,
                            },
                        ],
                    },
                    {
                        AND: [
                            {
                                user_2_id: user1Id,
                            },
                            {
                                user_1_id: user2Id,
                            },
                        ],
                    },
                ],
            },
        });

        if (!chat) {
            return null;
        }

        return new SingleChatDTO({
            id: chat.chat_id,
            to: chat.user_1_id,
            from: chat.user_2_id,
        });
    }

    static async deleteChat(chatId: string): Promise<void> {
        if (!chatId) {
            return;
        }

        await client.singleChat.delete({
            where: {
                chat_id: chatId,
            },
        });
    }
}
