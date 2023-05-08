import { User } from '@prisma/client';

export class FriendService {
    public static saveFriend(): Promise<void> {
        return new Promise((resolve) => {
            resolve();
        });
    }

    public static getFriends(): Promise<User[]> {
        return new Promise((resolve) => {
            resolve([]);
        });
    }

    public static deleteFriend(): Promise<void> {
        return new Promise((resolve) => {
            resolve();
        });
    }
}
