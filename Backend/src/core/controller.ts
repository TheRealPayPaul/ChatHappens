import { Response } from 'express';
import { ErrorCode, StatusCode } from './codes';

interface SendErrorBuilder {
    Message: string | string[]
    ErrorCode: ErrorCode
    StatusCode: StatusCode
}

export default class Controller {

    protected static sendError(data: SendErrorBuilder, res: Response) {
        res.status(data.StatusCode);
        
        const errors = Array.isArray(data.Message) ? data.Message : [ data.Message ];

        res.json({
            error_code: data.ErrorCode,
            errors
        });
    }

}