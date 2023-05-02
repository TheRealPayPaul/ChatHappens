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
        }

        if (!user.display_name) {
            this.addError('"display_name" is missing!');
        }

        if (!user.password) {
            this.addError('"password" is missing!');
        }

        return this.hasNoErrors();
    }
}
