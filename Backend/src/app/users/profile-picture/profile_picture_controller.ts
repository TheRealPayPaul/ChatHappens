import { Request, Response } from 'express';
import Controller from '../../../core/controller';
import { ErrorCode, StatusCode } from '../../../core/codes';
import { ProfilePictureService } from './profile_picture_service';
import { CurrentUserService } from '../../../core/service/current-user-service';

export class ProfilePictureController extends Controller {
    static async getProfilePicture(req: Request, res: Response): Promise<void> {
        const userId: string =
            (req.query.id as string) ??
            CurrentUserService.getCurrentUser(req).id;

        if (!userId) {
            this.sendBadRequestError('User id not provided', res);
            return;
        }

        res.status(StatusCode.OK).send(
            await ProfilePictureService.getProfilePicture(userId)
        );
    }

    static async setProfilePicture(req: Request, res: Response): Promise<void> {
        const userId: string = CurrentUserService.getCurrentUser(req).id;
        const image = req.file;

        if (!image) {
            this.sendBadRequestError('Profile picture not provided', res);
            return;
        }

        try {
            await ProfilePictureService.setProfilePicture({
                userId,
                image,
            });
        } catch (e) {
            this.sendError(
                {
                    Message: (e as Error).message,
                    StatusCode: StatusCode.INTERNAL_SERVER_ERROR,
                    ErrorCode: ErrorCode.USER_NOT_FOUND,
                },
                res
            );
            return;
        }
        res.status(StatusCode.OK).send();
    }
}
