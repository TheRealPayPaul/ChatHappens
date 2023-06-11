export class SendMessageDTO {
    chatId: string;
    message: string;

    constructor(chatId: string, message: string) {
        this.chatId = chatId;
        this.message = message;
    }
}