import { Request, Response } from 'express';
import Controller from '../../core/controller';
import { ErrorCode, StatusCode } from '../../core/codes';
import Credentials from './model/credentials';
import Jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import UserService from '../../core/service/user_service';
import EnvService from '../../core/service/env_service';
import JWTService from '../../core/service/jwt_service';

export default class LoginController extends Controller {

    /**
     * Handles the request and response of the /login route.
     * Checks if sent login data is correct and valid.
     * 
     * If successful:
     * JWT Token gets created and sent back via a 'Set-Cookie' header.
     * 
     * @param req :Request (express)
     * @param res :Response (express)
     */
    public static async handle(req: Request, res: Response) {
        // Checks if the authorization header is set
        if (req.headers['authorization'] == null) {
            this.sendError({
                Message: 'Authorization Header is missing!',
                ErrorCode: ErrorCode.AUTH_HEADER_MISSING,
                StatusCode: StatusCode.BAD_REQUEST,
            }, res);
            return;
        }

        // Checks if credentials and user in DB match
        const credentials = new Credentials(req.headers['authorization']);
        const user = await UserService.getByEmail(credentials.Email);
        if (!credentials.areValid(user)) {
            this.sendError({
                Message: 'Credentials are invalid!',
                ErrorCode: ErrorCode.CREDENTIALS_INVALID,
                StatusCode: StatusCode.UNAUTHORIZED,
            }, res);
            return;
        }

        // Create and Set JWT Token as Cookie
        JWTService.initTokenAsCookie(user as User, res); // User NULL check by 'credentials.areValid' 
        res.sendStatus(StatusCode.OK);
    }

    private static createJWTToken(user: User): string {
        const payLoad = {
            id: user.user_id,
            display_name: user.display_name
        };
        const options = {
            expiresIn: `${EnvService.getJwtTTL()}d`
        };
        return Jwt.sign(payLoad, EnvService.getJwtSecret(), options);
    }

    private static createCookieExpirationDate(): Date {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + parseInt(EnvService.getJwtTTL()));
        return expirationDate;
    }
}