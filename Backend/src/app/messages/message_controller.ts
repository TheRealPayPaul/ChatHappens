import { Request, Response } from 'express';
import { MessageService } from './message_service';
import Controller from '../../core/controller';
import { ErrorCode, StatusCode } from '../../core/codes';
import { CurrentUserService } from '../../core/service/current-user-service';

export class MessageController extends Controller {
    public static async getMessages(req: Request, res: Response): Promise<void> {
        const chatId = req.query['chatId'] as string;
        
        if (!chatId) {
            this.sendError({
                Message: 'Missing chat id',
                StatusCode: StatusCode.BAD_REQUEST,
                ErrorCode: ErrorCode.MISSING_CHAT_ID,
            }, res);
            return;
        }
        
        const messages = await MessageService.getMessages(
            chatId,
            CurrentUserService.getCurrentUser(req)
        );
        res.status(StatusCode.OK).json(messages);
    }
}