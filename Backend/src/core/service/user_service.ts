import { PrismaClient, User } from '@prisma/client';
import { Service } from './service';

const client = new PrismaClient();

interface UserCreateArgs {
    email: string;
    display_name: string;
    password: string;
}

export class UserService extends Service {
    public static async getByEmail(email: string): Promise<User | null> {
        return client.user.findUnique({
            where: {
                email,
            },
        });
    }

    public static async emailExists(email: string): Promise<boolean> {
        const count = await client.user.count({
            where: {
                email,
            },
        });

        return count > 0;
    }

    public static async create(userArgs: UserCreateArgs): Promise<User> {
        return client.user.create({
            data: userArgs,
        });
    }
}
