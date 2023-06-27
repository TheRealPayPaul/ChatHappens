import { FriendRequestDTO } from './model/friend_request_dto';
import {FriendRequest, PrismaClient, User} from '@prisma/client';
import { FriendService } from '../friend_service';

type FriendRequestInclude = FriendRequest & { from: User; to: User }

const client = new PrismaClient();

export class FriendRequestService {
    public static async newFriendRequest(
        senderId: string,
        receiverId: string
    ): Promise<void> {
        if (senderId === receiverId) {
            return;
        }

        if (await FriendService.isFriends(senderId, receiverId)) {
            return;
        }

        if (await this.friendRequestExistsFor(senderId, receiverId)) {
            return;
        }

        await client.friendRequest.create({
            data: {
                from_user_id: senderId,
                to_user_id: receiverId,
            },
        });
    }

    public static async friendRequestExistsFor(
        userId1: string,
        userId2: string
    ): Promise<boolean> {
        return (
            (await client.friendRequest.count({
                where: {
                    OR: [
                        {
                            AND: [
                                {
                                    from_user_id: userId1,
                                },
                                { to_user_id: userId2 },
                            ],
                        },
                        {
                            AND: [
                                {
                                    from_user_id: userId2,
                                },
                                { to_user_id: userId1 },
                            ],
                        },
                    ],
                },
            })) > 0
        );
    }

    public static async acceptFriendRequest(
        friendRequestId: string
    ): Promise<void> {
        const friendRequest = await client.friendRequest.findFirst({
            where: {
                friend_request_id: friendRequestId,
            },
        });

        if (!friendRequest) {
            return;
        }

        await client.$transaction(async () => {
            await FriendService.saveFriend(
                friendRequest.from_user_id,
                friendRequest.to_user_id
            );

            await this.deleteFriendRequest(friendRequestId);
        });
    }

    public static async exists(id: string): Promise<boolean> {
        return (
            (await client.friendRequest.count({
                where: {
                    friend_request_id: id,
                },
            })) > 0
        );
    }

    public static async deleteFriendRequest(
        friendRequestId: string
    ): Promise<void> {
        await client.friendRequest.delete({
            where: {
                friend_request_id: friendRequestId,
            },
        });
    }

    public static async getReceivedFriendRequests(
        userId: string
    ): Promise<FriendRequestDTO[]> {
        return (
            await client.friendRequest.findMany({
                where: {
                    to_user_id: userId,
                },
                include: {
                    from: true,
                    to: true,
                },
            })
        ).map((friendRequest: FriendRequestInclude) => FriendRequestDTO.toDTO(friendRequest));
    }

    public static async getSentFriendRequests(
        userId: string
    ): Promise<FriendRequestDTO[]> {
        return (
            await client.friendRequest.findMany({
                where: {
                    from_user_id: userId,
                },
                include: {
                    from: true,
                    to: true,
                },
            })
        ).map((friendRequest: FriendRequestInclude) => FriendRequestDTO.toDTO(friendRequest));
    }
}
