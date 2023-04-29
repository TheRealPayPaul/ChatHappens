import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../codes";
import Jwt from "jsonwebtoken";
import EnvService from "../service/env_service";

export function AuthGuardLoggedIn(req: Request, res: Response, next: NextFunction) {
    
    if (!req.cookies.jwt) {
        res.sendStatus(StatusCode.UNAUTHORIZED);
        return;
    }

    try {
        Jwt.verify(req.cookies.jwt, EnvService.getJwtSecret());
        next();
    } catch {
        res.sendStatus(StatusCode.UNAUTHORIZED);
    }
}