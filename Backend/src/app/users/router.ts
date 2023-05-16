import express from 'express';
import user_search_router from './search/search_user_router';

const router = express.Router();

router.use('/search', user_search_router);

export default router;
