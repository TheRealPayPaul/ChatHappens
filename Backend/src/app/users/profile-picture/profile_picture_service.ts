import { ProfilePicture, ProfilePictureModel } from './profile_picture_model';
import { UserService } from '../../../core/service/user_service';
import { defaultProfilePictures } from './default-profile-pictures';

interface SaveMessageParams {
    userId: string;
    image: Express.Multer.File;
}

/**
 * Service for profile pictures
 */
export class ProfilePictureService {
    /**
     * Set profile picture for user.
     *
     * @param userId user to set profile picture for.
     * @param image image to set (in bytes).
     */
    static async setProfilePicture({
        userId,
        image,
    }: SaveMessageParams): Promise<void> {
        if (!(await UserService.exists(userId))) {
            throw new Error('User does not exist');
        }

        const imageBase64 = image.buffer?.toString('base64');
        const existingProfilePicture = await this.findProfilePicture(userId);

        if (existingProfilePicture) {
            await ProfilePictureModel.updateOne(
                {
                    _id: existingProfilePicture._id,
                },
                {
                    $set: {
                        imageBase64,
                    },
                },
                { runValidators: true }
            );
            return;
        }

        await ProfilePictureModel.create({
            userId,
            imageBase64,
        });
    }

    /**
     * Get profile picture of user.
     *
     * @param userId id of user.
     */
    static async getProfilePicture(userId: string): Promise<string> {
        const profilePicture = await this.findProfilePicture(userId);
        return (
            profilePicture?.imageBase64 ?? this.getDefaultProfilePicture(userId)
        );
    }

    private static getDefaultProfilePicture(userId: string): string {
        return defaultProfilePictures[
            this.hashString(userId) % defaultProfilePictures.length
        ];
    }

    private static hashString(str: string): number {
        const lowercaseArr = [...str.toLowerCase()];
        return lowercaseArr.reduce(
            (result, char) => result + char.charCodeAt(0),
            0
        );
    }

    private static async findProfilePicture(
        userId: string
    ): Promise<ProfilePicture | null> {
        return ProfilePictureModel.findOne({
            userId: userId,
        });
    }
}
