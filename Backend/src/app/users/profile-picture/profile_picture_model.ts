import { model, Schema } from 'mongoose';

export interface ProfilePicture {
    _id: string;
    userId: string;
    imageBase64: string;
}

const profilePictureSchema = new Schema<ProfilePicture>(
    {
        userId: { type: String, required: true },
        imageBase64: { type: String, required: true },
    },
    { collection: 'profile_pictures' }
);

const ProfilePictureModel = model<ProfilePicture>(
    'profile_picture',
    profilePictureSchema
);

export { ProfilePictureModel };
