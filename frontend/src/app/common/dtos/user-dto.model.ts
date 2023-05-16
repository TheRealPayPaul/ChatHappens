export class UserDTO {
	public id?: string;
	public display_name?: string;

	public constructor(data: Partial<UserDTO>) {
		this.id = data.id;
		this.display_name = data.display_name;
	}
}
