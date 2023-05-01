export class UserDTO {
	public id?: string;
	public email?: string;
	public display_name?: string;
	public password?: string;
	public profile_picture?: string;
	public created_on?: string;

	public constructor(data: Partial<UserDTO>) {
		this.id = data.id;
		this.email = data.email;
		this.display_name = data.display_name;
		this.password = data.password;
		this.profile_picture = data.profile_picture;
		this.created_on = data.created_on;
	}
}
