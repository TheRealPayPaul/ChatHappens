import express from 'express';
import displayname_router from './displayname/router';
import password_router from './password/router';
import email_router from './email/router';

const router = express.Router();

router.use('/email', email_router);
router.use('/password', password_router);
router.use('/displayname', displayname_router);

export default router;
