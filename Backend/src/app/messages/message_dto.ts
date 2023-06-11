import { CurrentUser } from '../../core/service/current-user';
import { Message } from './message_model';

export enum Sender {
    Self,
    Other,
}

export class MessageDTO {
    chatId: string;
    userId: string;
    content: string;
    timestamp: Date;
    sender: Sender;

    constructor(data: MessageDTO) {
        this.chatId = data.chatId;
        this.userId = data.userId;
        this.content = data.content;
        this.timestamp = data.timestamp;
        this.sender = data.sender;
    }

    public static toDTO(data: Message, currentUser: CurrentUser): MessageDTO {
        return new MessageDTO({
            chatId: data.chatId,
            userId: data.userId,
            content: data.content,
            timestamp: data.timestamp,
            sender: currentUser.id === data.userId ? Sender.Self : Sender.Other,
        });
    }
}
