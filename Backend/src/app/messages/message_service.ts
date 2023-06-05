import { Message, MessageModel } from './message_model';
import { CurrentUser } from '../../core/service/current-user';
import { MessageDTO } from './message_dto';

interface SaveMessageParams {
    chatId: string;
    userId: string;
    content: string;
}

export class MessageService {
    static async saveMessage({
        chatId,
        userId,
        content,
    }: SaveMessageParams): Promise<void> {
        await MessageModel.create({
            chatId,
            userId,
            content,
        });
    }

    static async getMessages(chatId: string, currentUser: CurrentUser): Promise<MessageDTO[]> {
        const messages = await MessageModel.find({
            chatId,
        }).sort({
            timestamp: -1,
        });

        return messages.map((msg: Message) => {
            return MessageDTO.toDTO(msg, currentUser);
        });
    }
}
