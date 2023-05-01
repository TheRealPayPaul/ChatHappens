import { ErrorCode, StatusCode } from "../../core/codes";
import Controller from "../../core/controller";
import UserService from "../../core/service/user_service";
import UserDTO from "./user_dto";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

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
    public static async handle(req: Request, res: Response) {
        let user = new UserDTO(req.body);

        // Check if data from client is valid
        if (!user.isValidCreateUser()) {
            this.sendError({
                Message: user.getErrors(),
                ErrorCode: ErrorCode.SENT_DATA_INVALID,
                StatusCode: StatusCode.BAD_REQUEST,
            }, res);
            return;
        }

        // Check if email already exists
        const emailExists = await UserService.getByEmail(user.email as string);
        if (emailExists) {
            this.sendError({
                Message: `Email '${user.email}' already exists!`,
                ErrorCode: ErrorCode.EMAIL_ALREADY_EXISTS,
                StatusCode: StatusCode.BAD_REQUEST,
            }, res);
            return;
        }

        // Create User    
        const newUser = await UserService.create({
            email: user.email as string,
            display_name: user.display_name as string,
            password: this.createPasswordHash(user.password as string),
        });

        res
        .status(StatusCode.OK)
        .json({
            id: newUser.user_id,
            email: newUser.email,
            display_name: newUser.display_name,
            created_on: newUser.created_on,
        });
    }

    private static createPasswordHash(password: string): string {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(password as string, salt);
    }

}