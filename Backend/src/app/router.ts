import express from 'express';
import friend_router from './friends/router';

const router = express.Router();

router.use('/friends', friend_router);

export default router;
