import express from 'express';
import friend_router from './friends/router';
import user_router from './users/router';

const router = express.Router();

router.use('/friends', friend_router);
router.use('/users', user_router);

export default router;
