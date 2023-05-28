import express, { Request, Response } from 'express';
import { ChatController } from './chat_controller';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    ChatController.getChats(req, res);
});

export default router;
