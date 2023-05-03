import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

/**
 * Parses the credentials inside the Auhtorization Header string into a usable object.
 */
export default class Credentials {

    public readonly Email: string;
    public readonly Password: string;

    public constructor(authHeader: string) {
        if (!authHeader.match(/^Basic [A-Za-z0-9+/]+={0,2}$/))
            throw new Error('AuthHeader is not a valid BasicAuth string!');

        // 'Basic akvihuW=' => 'Basic' & 'akvihuW='
        const basicAuthParts: string[] = authHeader.split(' ');
        // 'akvihuW=' => 'email:password'
        const credentials = Buffer.from(basicAuthParts[1], 'base64').toString('utf8');
        // 'email:password' => 'email' & 'password' & ''
        const credentialParts = credentials.split(/:(.*)/);

        if (credentialParts.length != 3)
            throw new Error('BasicAuth is formatted wrong!');

        this.Email = credentialParts[0];
        this.Password = credentialParts[1];
    }

    /**
     * Checks if the password of the credentials matches with the password of the given user
     * 
     * @param user Targeted user for the credential validity check
     * @returns boolean => true = valid
     */
    public areValid(user: User | null): boolean {
        if (user === null)
            return false;

        return bcrypt.compareSync(this.Password, user.password); 
    }

}