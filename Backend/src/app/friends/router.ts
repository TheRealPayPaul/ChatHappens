import express from 'express';
import request_router from './requests/router';
import { FriendController } from './friend_controller';

const router = express.Router();

router.use('/requests', request_router);

router.get('/', (req, res) => {
    FriendController.getFriends(req, res);
});

router.delete('/', (req, res) => {
    FriendController.deleteFriend(req, res);
});

export default router;
