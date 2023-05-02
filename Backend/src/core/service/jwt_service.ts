import { User } from '@prisma/client';
import { Service } from './service';
import { Response } from 'express';
import EnvService from './env_service';
import Jwt from 'jsonwebtoken';

export default class JWTService extends Service {
    public static initTokenAsCookie(user: User, res: Response): void {
        const jwtToken = this.createJWTToken(user);
        const expires = this.createCookieExpirationDate();

        res.cookie('auth', jwtToken, { expires });
    }

    private static createJWTToken(user: User): string {
        const payLoad = {
            id: user.user_id,
            display_name: user.display_name,
        };
        const options = {
            expiresIn: `${EnvService.getJwtTTL()}d`,
        };
        return Jwt.sign(payLoad, EnvService.getJwtSecret(), options);
    }

    private static createCookieExpirationDate(): Date {
        const expirationDate = new Date();
        expirationDate.setDate(
            expirationDate.getDate() + parseInt(EnvService.getJwtTTL())
        );
        return expirationDate;
    }
}
