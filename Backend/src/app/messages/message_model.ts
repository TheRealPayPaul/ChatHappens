import { model, Schema } from 'mongoose';

export interface Message {
    chatId: string;
    userId: string;
    content: string;
    timestamp: Date;
}

const messageSchema = new Schema<Message>(
    {
        chatId: { type: String, required: true },
        userId: { type: String, required: true },
        timestamp: {
            type: Date,
            default: (): Date => new Date(),
            immutable: true,
        },
        content: { type: String, required: true },
    },
    { collection: 'messages' }
);

const MessageModel = model<Message>('message', messageSchema);

export { MessageModel };
