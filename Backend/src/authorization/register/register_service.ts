import Service from '../../core/service';
import UserDTO from './user_dto';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { ErrorCode, StatusCodes } from '../../core/codes';
import ServiceResult from '../../core/service_result';

const client = new PrismaClient();

export default class RegisterService extends Service {

    public static async createUser(data: Partial<UserDTO>): Promise<ServiceResult> {
        let user = new UserDTO(data);

        // Check if data from client is valid
        if (!user.isValidCreateUser())
            return this.sendErrors(StatusCodes.BAD_REQUEST, user.getErrors(), ErrorCode.SENT_DATA_INVALID);

        // Check if email already exists
        const emailExists = await client.user.findUnique({
            where: {
                email: user.email
            }
        });

        if (emailExists) {
            return this.sendError(StatusCodes.BAD_REQUEST, `Email '${user.email}' already exists!`, ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        // Geneerate password hash
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

        return this.sendData(StatusCodes.OK, {
            id: newUser.user_id,
            email: newUser.email,
            display_name: newUser.display_name,
            created_on: newUser.created_on,
        });
    }

}