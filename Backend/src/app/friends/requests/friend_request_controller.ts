import Controller from '../../../core/controller';
import { Request, Response } from 'express';
import { ErrorCode, StatusCode } from '../../../core/codes';
import { FriendRequestService } from './friend_request_service';
import { CurrentUserService } from '../../../core/service/current-user-service';
import { UserService } from '../../../core/service/user_service';
import { FriendService } from '../friend_service';

export class FriendRequestController extends Controller {
    public static async sendRequest(
        req: Request,
        res: Response
    ): Promise<void> {
        const receiverId: string | undefined = req.body.id;
        const senderId: string = CurrentUserService.getCurrentUser(req).id;
        if (!receiverId) {
            this.sendBadRequestError('Receiver id not provided', res);
            return;
        }

        if (!(await UserService.exists(receiverId))) {
            this.sendError(
                {
                    Message: 'Receiver not found',
                    StatusCode: StatusCode.BAD_REQUEST,
                    ErrorCode: ErrorCode.SENT_DATA_INVALID,
                },
                res
            );
            return;
        }

        if (await FriendService.isFriends(senderId, receiverId)) {
            this.sendBadRequestError('Users are already friends', res);
            return;
        }

        if (senderId === receiverId) {
            this.sendError(
                {
                    Message: 'Sender cannot be receiver',
                    StatusCode: StatusCode.BAD_REQUEST,
                    ErrorCode: ErrorCode.SENT_DATA_INVALID,
                },
                res
            );
            return;
        }

        if (
            await FriendRequestService.friendRequestExistsFor(
                senderId,
                receiverId
            )
        ) {
            this.sendError(
                {
                    Message: 'Friend request already exists',
                    StatusCode: StatusCode.BAD_REQUEST,
                    ErrorCode: ErrorCode.SENT_DATA_INVALID,
                },
                res
            );
            return;
        }

        await FriendRequestService.newFriendRequest(
            CurrentUserService.getCurrentUser(req).id,
            req.body.id
        );

        res.status(StatusCode.OK).send();
    }

    public static async acceptRequest(
        req: Request,
        res: Response
    ): Promise<void> {
        const friendRequestId: string = req.body.id;
        if (!friendRequestId) {
            this.sendBadRequestError('Friend request id not provided', res);
            return;
        }

        if (!(await FriendRequestService.exists(friendRequestId))) {
            this.sendError(
                {
                    Message: 'Friend request not found',
                    StatusCode: StatusCode.BAD_REQUEST,
                    ErrorCode: ErrorCode.SENT_DATA_INVALID,
                },
                res
            );
            return;
        }

        await FriendRequestService.acceptFriendRequest(friendRequestId);

        res.status(StatusCode.OK).send();
    }

    public static async declineRequest(
        req: Request,
        res: Response
    ): Promise<void> {
        const friendRequestId: string = req.body.id;
        if (!friendRequestId) {
            this.sendBadRequestError('Friend request id not provided', res);
            return;
        }

        if (!(await FriendRequestService.exists(friendRequestId))) {
            this.sendBadRequestError('Friend request not found', res);
            return;
        }

        await FriendRequestService.deleteFriendRequest(friendRequestId);
        res.status(StatusCode.OK).send();
    }

    public static async getReceivedFriendRequests(
        req: Request,
        res: Response
    ): Promise<void> {
        res.status(StatusCode.OK).send(
            await FriendRequestService.getReceivedFriendRequests(
                CurrentUserService.getCurrentUser(req).id
            )
        );
    }

    public static async getSentFriendRequests(
        req: Request,
        res: Response
    ): Promise<void> {
        res.status(StatusCode.OK).send(
            await FriendRequestService.getSentFriendRequests(
                CurrentUserService.getCurrentUser(req).id
            )
        );
    }
}
