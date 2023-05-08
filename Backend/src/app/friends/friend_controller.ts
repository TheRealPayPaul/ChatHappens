import Controller from '../../core/controller';
import { Request, Response } from 'express';
import { StatusCode } from '../../core/codes';

export class FriendController extends Controller {
    public static async getFriends(req: Request, res: Response): Promise<void> {
        res.status(StatusCode.OK).send('Get all friends');
    }

    public static async deleteFriend(
        req: Request,
        res: Response
    ): Promise<void> {
        res.status(StatusCode.OK).send('Delete friend');
    }
}
