import { PrismaClient } from '@prisma/client';
import { SingleChatDTO } from './single_chat_dto';
import { UserDTO } from '../../core/dto/user/user_dto';
import { ChatDTO } from './chat_dto';

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
                include: {
                    user_1: true,
                    user_2: true,
                },
            })
        ).map((entry) => {
            const from = UserDTO.toDTO(
                entry.user_1_id === userId ? entry.user_1 : entry.user_2
            );
            const to = UserDTO.toDTO(
                entry.user_1_id === userId ? entry.user_2 : entry.user_1
            );

            return SingleChatDTO.toDTO(entry.chat_id, to, from);
        });
    }

    static async getChatById(chatId: string): Promise<ChatDTO | null> {
        const chat = await client.singleChat.findFirst({
            where: {
                chat_id: chatId,
            }
        });

        if (!chat) {
            return null;
        }

        return new ChatDTO({
            id: chat.chat_id,
            participants: [ chat.user_1_id, chat.user_2_id ],
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
            include: {
                user_1: true,
                user_2: true,
            },
        });

        if (!chat) {
            return null;
        }

        return new SingleChatDTO({
            id: chat.chat_id,
            to: UserDTO.toDTO(chat.user_1),
            from: UserDTO.toDTO(chat.user_2),
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
