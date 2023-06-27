import express from 'express';
import { SettingsController } from '../settings_controller';

const router = express.Router();

router.put('/', (req, res) => {
    SettingsController.putDisplayName(req, res);
});

export default router;
