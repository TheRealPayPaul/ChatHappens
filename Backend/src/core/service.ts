import { ErrorCode } from './codes';
import ServiceResult from './service_result';

export default class Service {

    protected static sendError(statusCode: number, error: string, error_code: number = ErrorCode.UNDEFINED_CODE): ServiceResult {
        let data = {
            'error_code': error_code,
            'errors': [
                error
            ],
        };
        
        return new ServiceResult({
            statusCode,
            data
        });
    }

    protected static sendErrors(statusCode: number, errors: string[], error_code: number = ErrorCode.UNDEFINED_CODE): ServiceResult {
        let data = {
            'error_code': error_code,
            'errors': errors,
        };
        
        return new ServiceResult({
            statusCode,
            data
        });
    }

    protected static sendData(statusCode: number, data: object): ServiceResult {
        return new ServiceResult({
            statusCode,
            data
        });
    }

    protected static sendStatus(statusCode: number): ServiceResult {
        return new ServiceResult({
            statusCode
        });
    }

}