import DTO from '../../core/dto';

export default class UserDTO extends DTO {
    public readonly id?: number
    public readonly email?: string
    public readonly display_name?: string
    public readonly password?: string
    public readonly repeat_password?: string
    public readonly profile_picture?: string
    public readonly created_on?: string

    public constructor(data: Partial<UserDTO>) {
        super();
        
        this.id = data.id;
        this.email = data.email;
        this.display_name = data.display_name;
        this.password = data.password;
        this.repeat_password = data.repeat_password;
        this.profile_picture = data.profile_picture;
        this.created_on = data.created_on;
    }

    public isValidCreateUser(): boolean {
        this.clearErrors();

        if (!this.email)
            this.addError('\'email\' is missing!');

        if (!this.display_name)
            this.addError('\'display_name\' is missing!');

        if (!this.password)
            this.addError('\'password\' is missing!');

        if (!this.repeat_password)
            this.addError('\'repeat_password\' is missing!');

        return this.hasNoErrors();
    }
}