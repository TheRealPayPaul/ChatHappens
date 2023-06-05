import express from 'express';
import { MessageController } from './message_controller';

const router = express.Router();

router.get('/', (req, res) => {
    MessageController.getMessages(req, res);
});

export default router;
