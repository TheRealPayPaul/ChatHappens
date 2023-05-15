import { FriendRequestDTO } from './model/friend_request_dto';

export class FriendRequestService {
    public static sendFriendRequest(): Promise<void> {
        return new Promise((resolve) => {
            resolve();
        });
    }

    public static acceptFriendRequest(): Promise<void> {
        return new Promise((resolve) => {
            resolve();
        });
    }

    public static declineFriendRequest(): Promise<void> {
        return new Promise((resolve) => {
            resolve();
        });
    }

    public static getReceivedFriendRequests(): Promise<FriendRequestDTO[]> {
        return new Promise((resolve) => {
            resolve([]);
        });
    }

    public static getSentFriendRequests(): Promise<FriendRequestDTO[]> {
        return new Promise((resolve) => {
            resolve([]);
        });
    }
}
