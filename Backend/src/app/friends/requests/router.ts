import express from 'express';
import send_request_router from './send/send_request.router';
import accept_request_router from './accept/accept_request.router';
import decline_request_router from './decline/decline_request.router';
import { FriendRequestController } from './friend_request_controller';

const router = express.Router();

router.use('/send', send_request_router);
router.use('/accept', accept_request_router);
router.use('/decline', decline_request_router);

router.get('/', (req, res) => {
    FriendRequestController.getRequests(req, res);
});

export default router;
