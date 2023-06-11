export class ChatDTO {
    id: string;
    participants: string[];

    constructor(data: ChatDTO) {
        this.id = data.id;
        this.participants = data.participants;
    }
}