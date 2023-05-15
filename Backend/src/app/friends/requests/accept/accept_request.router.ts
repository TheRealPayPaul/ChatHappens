import express from 'express';
import { FriendRequestController } from '../friend_request_controller';

const router = express.Router();

router.post('/', (req, res) => {
    FriendRequestController.acceptRequest(req, res);
});

export default router;
