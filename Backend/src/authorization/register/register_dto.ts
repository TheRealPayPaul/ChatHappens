export class RegisterDTO {
    public email: string;
    public display_name: string;
    public password: string;

    public constructor(data: RegisterDTO) {
        this.email = data.email;
        this.display_name = data.display_name;
        this.password = data.password;
    }
}
