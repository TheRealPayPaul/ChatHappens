import express from 'express';
import register_router from './register/register_router';

const router = express.Router();

router.use('/register', register_router);

export default router;