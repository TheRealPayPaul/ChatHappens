import express from 'express';
import send_request_router from './send/send_request.router';
import accept_request_router from './accept/accept_request.router';
import decline_request_router from './decline/decline_request.router';
import sent_request_router from './sent/sent_request.router';
import received_request_router from './received/received_request.router';

const router = express.Router();

router.use('/send', send_request_router);
router.use('/accept', accept_request_router);
router.use('/decline', decline_request_router);

router.use('/sent', sent_request_router);
router.use('/received', received_request_router);

export default router;
