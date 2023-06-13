import express from 'express';
import user_search_router from './search/search_user_router';
import profile_picture_router from './profile-picture/router';

const router = express.Router();

router.use('/search', user_search_router);
router.use('/profile-picture', profile_picture_router);

export default router;
