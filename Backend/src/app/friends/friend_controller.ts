import Controller from '../../core/controller';
import { Request, Response } from 'express';
import { ErrorCode, StatusCode } from '../../core/codes';
import { CurrentUserService } from '../../core/service/current-user-service';
import { FriendService } from './friend_service';

export class FriendController extends Controller {
    public static async getFriends(req: Request, res: Response): Promise<void> {
        res.status(StatusCode.OK).send(
            await FriendService.getFriends(
                CurrentUserService.getCurrentUser(req).id
            )
        );
    }

    public static async deleteFriend(
        req: Request,
        res: Response
    ): Promise<void> {
        const friendId = req.body.id;

        if (!friendId) {
            this.sendError(
                {
                    ErrorCode: ErrorCode.SENT_DATA_INVALID,
                    StatusCode: StatusCode.BAD_REQUEST,
                    Message: 'No friend was provided',
                },
                res
            );
            return;
        }

        await FriendService.deleteFriend(
            CurrentUserService.getCurrentUser(req).id,
            friendId
        );

        res.status(StatusCode.OK).send();
    }
}
