import express from 'express';
import { FriendRequestController } from '../friend_request_controller';

const router = express.Router();

router.get('/', (req, res) => {
    FriendRequestController.getReceivedFriendRequests(req, res);
});

export default router;
