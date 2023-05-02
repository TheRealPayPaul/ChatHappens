import express from 'express';
import email_unique_route from './email-unique/email_unique_route';

const router = express.Router();

router.use('/email-unique', email_unique_route);

export default router;
