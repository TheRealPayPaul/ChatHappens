import express from 'express';
import friend_router from './friends/router';
import user_router from './users/router';
import chat_router from './chats/router';
import message_router from './messages/router';

const router = express.Router();

router.use('/friends', friend_router);
router.use('/users', user_router);
router.use('/chats', chat_router);
router.use('/messages', message_router);

export default router;
