import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../codes';
import Jwt from 'jsonwebtoken';
import EnvService from '../service/env_service';

export function AuthGuardLoggedIn(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (!req.cookies.auth) {
        res.status(StatusCode.UNAUTHORIZED).send();
        return;
    }

    try {
        Jwt.verify(req.cookies.auth, EnvService.getJwtSecret());
        next();
    } catch {
        res.status(StatusCode.UNAUTHORIZED).send();
    }
}
