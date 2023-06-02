import express, { Request, Response } from 'express';
import { ProfilePictureController } from './profile_picture_controller';
import multer from 'multer';

const router = express.Router();

router.post('/', multer({}).single('image'), (req: Request, res: Response) =>
    ProfilePictureController.setProfilePicture(req, res)
);

router.get('/', (req: Request, res: Response) =>
    ProfilePictureController.getProfilePicture(req, res)
);

export default router;
