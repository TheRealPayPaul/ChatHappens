import Controller from '../../../core/controller';
import { UserService } from '../../../core/service/user_service';
import { ErrorCode, StatusCode } from '../../../core/codes';
import { Request, Response } from 'express';

export class EmailUniqueController extends Controller {
    /**
     * Handles the request and response of the /email-unique route.
     * Checks if sent email is unique.
     *
     * @param req :Request (express)
     * @param res :Response (express)
     */
    public static async handle(req: Request, res: Response): Promise<void> {
        if (!(typeof req.query.email == 'string') || !req.query.email) {
            this.sendError(
                {
                    StatusCode: StatusCode.BAD_REQUEST,
                    ErrorCode: ErrorCode.SENT_DATA_INVALID,
                    Message: 'Email is not provided!',
                },
                res
            );
            return;
        }

        const email: string = req.query.email as string;

        res.status(StatusCode.OK).send(!(await UserService.emailExists(email)));
    }
}
