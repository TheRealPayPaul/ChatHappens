import Controller from '../../core/controller';
import { Request, Response } from 'express';
import { UserService } from '../../core/service/user_service';
import { StatusCode } from '../../core/codes';

export class UserController extends Controller {
    public static async searchForUsers(
        req: Request,
        res: Response
    ): Promise<void> {
        res.status(StatusCode.OK).send(await UserService.get());
    }
}
