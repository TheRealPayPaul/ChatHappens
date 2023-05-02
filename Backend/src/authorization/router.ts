import express from 'express';
import register_router from './register/register_router';
import login_router from './login/login_router';
import validation_route from './validation/validation_route';

const router = express.Router();

router.use('/register', register_router);
router.use('/login', login_router);
router.use('/validate', validation_route);

export default router;
