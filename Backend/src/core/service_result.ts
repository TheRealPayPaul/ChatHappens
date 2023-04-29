import { CookieOptions, Response } from "express";
import { StatusCodes } from "./codes";

interface Cookie {
    name: string
    value: string
    options?: CookieOptions
}

interface ServiceResultBuilder {
    statusCode: StatusCodes
    data?: object
    cookies?: Cookie[]
}

export default class ServiceResult {
    public readonly StatusCode: number;
    public readonly Data?: object;
    public readonly Cookies?: Cookie[];

    public constructor(builder: ServiceResultBuilder) {
        this.StatusCode = builder.statusCode;
        this.Data = builder.data;
        this.Cookies = builder.cookies;
    }

    public send(res: Response) {
        this.setCookies(res);

        if (!this.Data) {
            res.sendStatus(this.StatusCode);
            return;
        }
    
        res
        .status(this.StatusCode)
        .json(this.Data);
    }

    private setCookies(res: Response) {
        if (!this.Cookies || this.Cookies.length <= 0)
            return;
            
        this.Cookies.forEach(cookie => {
            let options = cookie.options ?? {};
            res.cookie(cookie.name, cookie.value, options);
        });
    }
}