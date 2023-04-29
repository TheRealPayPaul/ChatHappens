import { Request } from "express";
import Service from "../../core/service";
import Credentials from "./model/credentials";
import { ErrorCode, StatusCodes } from "../../core/codes";
import ServiceResult from "../../core/service_result";
import Jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";

const client = new PrismaClient();

export default class LoginService extends Service {

    public static async login(req: Request): Promise<ServiceResult> {

        // Checks if the authorization header is set
        if (req.headers["authorization"] == null) {
            return this.sendError(StatusCodes.BAD_REQUEST, "Authorization Header is missing!", ErrorCode.AUTH_HEADER_MISSING);
        }

        // Converts the authorization header into the Credential class
        // Fetches user from the database by given email
        let credentials = new Credentials(req.headers["authorization"]);
        let user = await client.user.findUnique({
            where: {
                email: credentials.Email
            }
        });

        // Checks if credentials are valid with found user
        if (!credentials.areValid(user)) {
            return this.sendError(StatusCodes.UNAUTHORIZED, "Credentials are invalid!", ErrorCode.CREDENTIALS_INVALID);
        }

        // Fetches the JWT_SECRET and JWT_TTL_DAYS
        let secret = process.env.JWT_SECRET;
        if (!secret) {
            throw Error("Env 'JWT_SECRET' not found!");
        }
        let jwtTTL = process.env.JWT_TTL_DAYS;
        if (!jwtTTL) {
            throw Error("Env 'JWT_TTL_DAYS' not found!");
        }

        // Creates the JWT Token
        user = user as User; // Got already checked for null in 'credentials.areValid'
        let jwtToken = Jwt.sign({
            id: user.user_id,
            display_name: user.display_name
        }, secret, {
            expiresIn: `${jwtTTL}d`
        });

        // Create the expiration date object for the jwt cookie
        let expires = new Date();
        expires.setDate(expires.getDate() + parseInt(jwtTTL));

        return new ServiceResult({
            statusCode: StatusCodes.OK,
            cookies: [
                { name: "jwt", value: jwtToken, options: { expires } }
            ]
        });
    }

}