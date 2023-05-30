import { Message, MessageModel } from './message_model';
import { SillyGooseService } from '../../core/service/silly_goose_service';

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
        await SillyGooseService.connect();

        await MessageModel.create({
            chatId,
            userId,
            content,
        });
    }

    static async getMessages(chatId: string): Promise<Message[]> {
        await SillyGooseService.connect();

        return MessageModel.find({
            chatId,
        }).sort({
            timestamp: 1,
        });
    }
}
