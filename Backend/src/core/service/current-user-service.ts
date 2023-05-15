import { Request } from 'express';
import { CurrentUser } from './current-user';
import JWTService, { TokenData } from './jwt_service';

export class CurrentUserService {
    public static getCurrentUser(req: Request): CurrentUser | null {
        const tokenData: TokenData | null = JWTService.getTokenData(req);
        if (!tokenData) {
            return null;
        }

        return new CurrentUser(tokenData.id, tokenData.display_name);
    }
}
