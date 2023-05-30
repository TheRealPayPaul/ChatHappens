import { ErrorCode, StatusCode } from '../../core/codes';
import Controller from '../../core/controller';
import { UserService } from '../../core/service/user_service';
import { UserDTO } from '../../core/dto/user/user_dto';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import RegisterDTOValidator from '../../core/dto/user/user_dto_validator';
import JWTService from '../../core/service/jwt_service';
import { RegisterDTO } from './register_dto';

export default class RegisterController extends Controller {
    /**
     * Handles the request and response of the /register route.
     * Checks if sent register data is correct and valid.
     *
     * If successful:
     * User gets created in DB.
     * User gets sent back as a response.
     *
     * @param req :Request (express)
     * @param res :Response (express)
     */
    public static async handle(req: Request, res: Response): Promise<void> {
        const userData = new RegisterDTO(req.body);

        // Check if data from client is valid
        const registerDTOValidator = new RegisterDTOValidator();
        if (!registerDTOValidator.isValidCreateUser(userData)) {
            this.sendError(
                {
                    Message: registerDTOValidator.getErrors(),
                    ErrorCode: ErrorCode.SENT_DATA_INVALID,
                    StatusCode: StatusCode.BAD_REQUEST,
                },
                res
            );
            return;
        }

        // Check if email already exists
        const emailExists = await UserService.emailExists(
            userData.email as string
        );
        if (emailExists) {
            this.sendError(
                {
                    Message: `Email '${userData.email}' already exists!`,
                    ErrorCode: ErrorCode.EMAIL_ALREADY_EXISTS,
                    StatusCode: StatusCode.BAD_REQUEST,
                },
                res
            );
            return;
        }

        // Create User
        const newUser = await UserService.create({
            email: userData.email as string,
            display_name: userData.display_name as string,
            password: this.createPasswordHash(userData.password as string),
        });

        // Create and Set JWT Token as Cookie
        JWTService.initTokenAsCookie(newUser, res);
        res.status(StatusCode.OK).json(UserDTO.toDTO(newUser));
    }

    private static createPasswordHash(password: string): string {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(password, salt);
    }
}
