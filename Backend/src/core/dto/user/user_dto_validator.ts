import DTOValidator from '../dto_validator';
import { RegisterDTO } from '../../../authorization/register/register_dto';

export default class RegisterDTOValidator extends DTOValidator {
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
    public isValidCreateUser(user: RegisterDTO): boolean {
        this.clearErrors();

        if (!user.email) {
            this.addError('"email" is missing!');
        } else {
            if (!RegisterDTOValidator.EMAIL_REGEX.test(user.email)) {
                this.addError('"email" is in the wrong format!');
            }
            if (user.email.length > RegisterDTOValidator.MAX_EMAIL_LENGTH) {
                this.addError(
                    `"email" exceeds the length limit of ${RegisterDTOValidator.MAX_EMAIL_LENGTH}!`
                );
            }
        }

        if (!user.display_name) {
            this.addError('"display_name" is missing!');
        } else {
            if (
                user.display_name.length >
                RegisterDTOValidator.MAX_PASSWORD_LENGTH
            ) {
                this.addError(
                    `"display_name" exceeds the length limit of ${RegisterDTOValidator.MAX_PASSWORD_LENGTH}!`
                );
            }
        }

        if (!user.password) {
            this.addError('"password" is missing!');
        } else {
            if (RegisterDTOValidator.PASSWORD_REGEX.test(user.password)) {
                this.addError('"password" has a white space!');
            }
        }

        return this.hasNoErrors();
    }
}
