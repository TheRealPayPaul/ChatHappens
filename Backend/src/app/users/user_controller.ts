import Controller from '../../core/controller';
import { Request, Response } from 'express';
import { UserService } from '../../core/service/user_service';
import { StatusCode } from '../../core/codes';
import { CurrentUserService } from '../../core/service/current-user-service';

export class UserController extends Controller {
    public static async searchForUsers(
        req: Request,
        res: Response
    ): Promise<void> {
        const excludeSelf = req.query.excludeSelf
            ? this.queryParamToBool(req.query.excludeSelf as string)
            : false;
        const excludeFriends = req.query.excludeFriends
            ? this.queryParamToBool(req.query.excludeFriends as string)
            : false;
        const displayName = req.query.displayName as string;

        res.status(StatusCode.OK).send(
            await UserService.find(CurrentUserService.getCurrentUser(req).id, {
                excludeSelf,
                excludeFriends,
                displayName,
            })
        );
    }
}
