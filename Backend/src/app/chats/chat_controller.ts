import { Request, Response } from 'express';
import { ChatService } from './chat_service';
import { CurrentUserService } from '../../core/service/current-user-service';

export class ChatController {
    static async getChats(req: Request, res: Response): Promise<void> {
        res.status(200).json(
            await ChatService.getChats(
                CurrentUserService.getCurrentUser(req).id
            )
        );
    }
}
