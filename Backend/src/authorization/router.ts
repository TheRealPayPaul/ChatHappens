import express from 'express';
import register_router from './register/register_router';
import login_router from './login/login_router';

const router = express.Router();

router.use('/register', register_router);
router.use('/login', login_router);

export default router;