import { User } from "@prisma/client";
import bcrypt from 'bcrypt';

export default class Credentials {

    public readonly Email: string;
    public readonly Password: string;

    public constructor(authHeader: string) {
        if (!authHeader.match(/^Basic [A-Za-z0-9+/]+={0,2}$/))
            throw new Error("AuthHeader is not a valid BasicAuth string!");

        // 'Basic akvihuW=' => 'Basic' & 'akvihuW='
        let basicAuthParts: string[] = authHeader.split(' ');
        // 'akvihuW=' => 'email:password'
        let credentials = Buffer.from(basicAuthParts[1], 'base64').toString('utf8');
        // 'email:password' => 'email' & 'password' & ''
        let credentialParts = credentials.split(/:(.*)/);

        if (credentialParts.length != 3)
            throw new Error("BasicAuth is formatted wrong!");

        this.Email = credentialParts[0];
        this.Password = credentialParts[1];
    }

    public areValid(user: User | null): boolean {
        if (user === null)
            return false;

        return bcrypt.compareSync(this.Password, user.password); 
    }

}