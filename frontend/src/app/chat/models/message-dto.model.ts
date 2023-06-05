import { Sender } from 'src/app/common/enums/Sender';

export class MessageDTO {
	chatId: string;
	userId: string;
	content: string;
	timestamp: string;
	sender: Sender;

	constructor(data: MessageDTO) {
		this.chatId = data.chatId;
		this.userId = data.userId;
		this.content = data.content;
		this.timestamp = data.timestamp;
		this.sender = data.sender;
	}
}
