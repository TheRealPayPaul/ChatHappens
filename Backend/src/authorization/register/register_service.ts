import Service from '../../core/service';
import UserDTO from './user_dto';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { EMAIL_ALREADY_EXISTS, SENT_DATA_INVALID, SENT_PASSWORD_NOT_THE_SAME } from '../../core/error_codes';

const client = new PrismaClient();

export default class RegisterService extends Service {

    public static async createUser(data: Partial<UserDTO>): Promise<object> {
        let user = new UserDTO(data);

        // Ckack if data from client is valid
        if (!user.isValidCreateUser())
            return this.sendError(user.getErrors(), SENT_DATA_INVALID);

        // Check if email already exists
        const emailExists = await client.user.findUnique({
            where: {
                email: user.email
            }
        });

        if (emailExists)
            return this.sendError([`Email '${user.email}' already exists!`], EMAIL_ALREADY_EXISTS);

        // Check Password
        if (user.password !== user.repeat_password)
            return this.sendError([`'password' and 'repeat_password' are not the same!`], SENT_PASSWORD_NOT_THE_SAME);

        const salt = bcrypt.genSaltSync();
        let hashed_password = bcrypt.hashSync(user.password as string, salt);

        // Create User    
        const newUser = await client.user.create({
            data: {
                email: user.email as string,
                display_name: user.display_name as string,
                password: hashed_password
            }
        });

        return this.sendSuccess({
            id: newUser.user_id,
            email: newUser.email,
            display_name: newUser.display_name,
            created_on: newUser.created_on,
        });
    }

}