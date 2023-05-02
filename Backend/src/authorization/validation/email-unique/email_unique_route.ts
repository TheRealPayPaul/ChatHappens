import express from 'express';
import { EmailUniqueController } from './email_unique_controller';

const router = express.Router();

/**
 * @Route /api/authorization/validate/email-unique
 *
 * @Requires Email
 *
 * @Returns true/false
 */
router.get('/', (req, res) => {
    EmailUniqueController.handle(req, res);
});

export default router;
