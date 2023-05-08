import Controller from '../../../core/controller';
import { Request, Response } from 'express';
import { StatusCode } from '../../../core/codes';

export class FriendRequestController extends Controller {
    public static async sendRequest(
        req: Request,
        res: Response
    ): Promise<void> {
        res.status(StatusCode.OK).send('Send');
    }

    public static async acceptRequest(
        req: Request,
        res: Response
    ): Promise<void> {
        res.status(StatusCode.OK).send('Accept');
    }

    public static async declineRequest(
        req: Request,
        res: Response
    ): Promise<void> {
        res.status(StatusCode.OK).send('Decline');
    }

    public static async getRequests(
        req: Request,
        res: Response
    ): Promise<void> {
        res.status(StatusCode.OK).send('Get all requests');
    }
}
