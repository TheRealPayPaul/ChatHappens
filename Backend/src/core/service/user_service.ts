import { PrismaClient } from '@prisma/client';
import Service from './service';

const client = new PrismaClient();

interface UserCreateArgs {
    email: string
    display_name: string
    password: string
}

export default class UserService extends Service {

    public static getByEmail(email: string) {
        return client.user.findUnique({
            where: {
                email
            }
        });
    }

    public static create(userArgs: UserCreateArgs) {
        return client.user.create({
            data: userArgs
        });
    }

}