import express from 'express';
import { SettingsController } from '../settings_controller';

const router = express.Router();

router.put('/', (req, res) => {
    SettingsController.putPassword(req, res);
});

export default router;
