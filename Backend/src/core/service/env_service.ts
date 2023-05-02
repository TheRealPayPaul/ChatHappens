import { Service } from './service';

export default class EnvService extends Service {
    public static getJwtSecret(): string {
        if (!process.env.JWT_SECRET) {
            throw Error('Env "JWT_SECRET" not found!');
        }
        return process.env.JWT_SECRET;
    }

    public static getJwtTTL(): string {
        if (!process.env.JWT_TTL_DAYS) {
            throw Error('Env "JWT_TTL_DAYS" not found!');
        }
        return process.env.JWT_TTL_DAYS;
    }
}
