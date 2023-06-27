import { Request, Response } from 'express';
import Controller from '../../core/controller';
import { ErrorCode, StatusCode } from '../../core/codes';
import bcrypt from 'bcrypt';
import JWTService from '../../core/service/jwt_service';
import { SettingsService } from './settings_service';
import { CurrentUserService } from '../../core/service/current-user-service';
import RegisterDTOValidator from '../../core/dto/user/user_dto_validator';

export class SettingsController extends Controller {
    public static async putDisplayName(req: Request, res: Response): Promise<void> {
        const newDisplayName = req.body.displayName as string;
        if (!newDisplayName && newDisplayName.length > 0) {
            this.sendBadRequestError('Missing field "displayName"', res);
            return;
        }

        const currentUser = CurrentUserService.getCurrentUser(req);
        const updatedUser = await SettingsService.updateDisplayName(currentUser.id, newDisplayName);

        JWTService.initTokenAsCookie(updatedUser, res);
        res.status(StatusCode.OK).send();
    }

    public static async putEmail(req: Request, res: Response): Promise<void> {
        const newEmail = req.body.email as string;
        if (!newEmail) {
            this.sendBadRequestError('Missing field "email"', res);
            return;
        }

        if (!RegisterDTOValidator.EMAIL_REGEX.test(newEmail)) {
            this.sendBadRequestError('"email" is in the wrong format', res);
            return;
        }

        const currentUser = CurrentUserService.getCurrentUser(req);
        await SettingsService.updateEmail(currentUser.id, newEmail);

        res.status(StatusCode.OK).send();
    }

    public static async putPassword(req: Request, res: Response): Promise<void> {
        const newPassword = req.body.password as string;
        if (!newPassword) {
            this.sendBadRequestError('Missing field "password"', res);
            return;
        }

        if (RegisterDTOValidator.PASSWORD_REGEX.test(newPassword)) {
            this.sendBadRequestError('"password" has a white space!', res);
            return;
        }

        const salt = bcrypt.genSaltSync();
        const hashedNewPassword = bcrypt.hashSync(newPassword, salt);

        const currentUser = CurrentUserService.getCurrentUser(req);
        await SettingsService.updatePassword(currentUser.id, hashedNewPassword);
        res.status(StatusCode.OK).send();
    }
}
