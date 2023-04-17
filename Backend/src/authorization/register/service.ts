import { UNDEFINED_CODE } from './error_codes';

export default class Service {

    protected static sendError(errors: string[], error_code: number = UNDEFINED_CODE): object {
        return {
            'success': false,
            'error_code': error_code,
            'errors': errors,
        }
    }

    protected static sendSuccess(data: object): object {
        return {
            'success': true,
            'data': data,
        }
    }

}