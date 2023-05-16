export class UserDTO {
	public id: string;
	public display_name: string;

	public constructor(id: string, display_name: string) {
		this.id = id;
		this.display_name = display_name;
	}
}
