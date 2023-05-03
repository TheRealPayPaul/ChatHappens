import { UserDTO } from './user_dto';
import DTOValidator from '../dto_validator';

export default class UserDTOValidator extends DTOValidator {

    private static readonly MAX_EMAIL_LENGTH: number = 128;
    private static readonly EMAIL_REGEX: RegExp = /^.+@.+$/;
    private static readonly MAX_PASSWORD_LENGTH: number = 128;
    private static readonly PASSWORD_REGEX: RegExp = /\s/g;

    /**
     * Checks if the data of the object is complete.
     * @required => email, display_name, password.
     *
     * @returns boolean => true = valid
     */
    public isValidCreateUser(user: UserDTO): boolean {
        this.clearErrors();

        if (!user.email) {
            this.addError('"email" is missing!');
        } else {
            if (!UserDTOValidator.EMAIL_REGEX.test(user.email)) {
                this.addError('"email" is in the wrong format!');
            }
            if (user.email.length > UserDTOValidator.MAX_EMAIL_LENGTH) {
                this.addError(`"email" exceeds the length limit of ${UserDTOValidator.MAX_EMAIL_LENGTH}!`);
            }
        }

        if (!user.display_name) {
            this.addError('"display_name" is missing!');
        } else {
            if (user.display_name.length > UserDTOValidator.MAX_PASSWORD_LENGTH) {
                this.addError(`"display_name" exceeds the length limit of ${UserDTOValidator.MAX_PASSWORD_LENGTH}!`);
            }
        }

        if (!user.password) {
            this.addError('"password" is missing!');
        } else {
            if (UserDTOValidator.PASSWORD_REGEX.test(user.password)) {
                this.addError('"password" has a white space!');
            }
        }

        return this.hasNoErrors();
    }
}
