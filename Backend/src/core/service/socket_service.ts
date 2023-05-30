import cookie from 'cookie';
import { Socket } from 'socket.io';
import JWTService, { TokenData } from './jwt_service';

export class SocketService {

    public static isAuthenticated(socket: Socket): boolean {
        const JWTToken = this.getJWTTokenString(socket);
        if (!JWTToken) return false;

        return JWTService.verifyToken(JWTToken);
    }

    public static getJWTTokenString(socket: Socket): string | null {
        if (!socket.handshake.headers.cookie) {
            return null;
        }

        const cookies = cookie.parse(socket.handshake.headers.cookie);
        if (!cookies.auth) {
            return null;
        }

        return cookies.auth;
    }

    public static getJWTToken(socket: Socket): TokenData | null {
        const jwtstring = this.getJWTTokenString(socket);
        if (!jwtstring) {
            return null;
        }

        return JWTService.getTokenDataFromString(jwtstring);
    }

}