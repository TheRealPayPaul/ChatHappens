export class SingleChatDTO {
	id: string;
	from: string;
	to: string;

	constructor(data: SingleChatDTO) {
		this.id = data.id;
		this.from = data.from;
		this.to = data.to;
	}
}
