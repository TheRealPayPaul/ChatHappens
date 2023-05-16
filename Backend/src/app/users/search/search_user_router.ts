import express from 'express';
import { UserController } from '../user_controller';

const router = express.Router();

router.get('/', (req, res) => {
    UserController.searchForUsers(req, res);
});

export default router;
