import { PrismaClient, User } from '@prisma/client';
import { Service } from '../../core/service/service';

const client = new PrismaClient();

export class SettingsService extends Service {
    static async updateDisplayName(userId: string, newDisplayName: string): Promise<User> {
        const updatedUser = await client.user.update({
            where: {
                user_id: userId,
            },
            data: {
                display_name: newDisplayName,
            }
        });

        return updatedUser;
    }

    static async updateEmail(userId: string, newEmail: string): Promise<User> {
        const updatedUser = await client.user.update({
            where: {
                user_id: userId,
            },
            data: {
                email: newEmail,
            }
        });

        return updatedUser;
    }

    static async updatePassword(userId: string, newPassword: string): Promise<User> {
        const updatedUser = await client.user.update({
            where: {
                user_id: userId,
            },
            data: {
                password: newPassword,
            }
        });

        return updatedUser;
    }
}
