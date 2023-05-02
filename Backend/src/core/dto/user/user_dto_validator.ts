import { UserDTO } from './user_dto';
import DTOValidator from '../dto_validator';

export default class UserDTOValidator extends DTOValidator {
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
            if (!user.email.match(/^.+@.+$/)) {
                this.addError('"email" is in the wrong format!');
            }
            if (user.email.length > 128) {
                this.addError('"email" exceeds the length limit of 128!');
            }
        }

        if (!user.display_name) {
            this.addError('"display_name" is missing!');
        } else {
            if (user.display_name.length > 45) {
                this.addError('"display_name" exceeds the length limit of 45!');
            }
        }

        if (!user.password) {
            this.addError('"password" is missing!');
        } else {
            if (user.password.match(/\s/g)) {
                this.addError('"password" has a white space!');
            }
        }

        return this.hasNoErrors();
    }
}
