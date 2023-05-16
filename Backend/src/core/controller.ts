import { Response } from 'express';
import { ErrorCode, StatusCode } from './codes';

interface SendErrorBuilder {
    Message: string | string[];
    ErrorCode: ErrorCode;
    StatusCode: StatusCode;
}

export default class Controller {
    protected static sendError(data: SendErrorBuilder, res: Response): void {
        res.status(data.StatusCode);

        const errors = Array.isArray(data.Message)
            ? data.Message
            : [data.Message];

        res.json({
            error_code: data.ErrorCode,
            errors,
        });
    }

    protected static sendBadRequestError(message: string, res: Response): void {
        this.sendError(
            {
                Message: message,
                StatusCode: StatusCode.BAD_REQUEST,
                ErrorCode: ErrorCode.SENT_DATA_INVALID,
            },
            res
        );
    }

    protected static queryParamToBool(value: string): boolean {
        return (value + '').toLowerCase() === 'true';
    }
}
