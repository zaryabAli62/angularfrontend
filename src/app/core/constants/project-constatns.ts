export const API_URL = "http://localhost:5000/api"
export const DEFAULT_API_ERROR = 'Error while making request';
export const HTTP_ERRORS = Object.freeze({
        400: 'Bad Request',
        401: 'Un-Authorized',
        403: 'Forbidden',
        404: 'Not Found',
        409: 'Conflict',
        419: 'Expired',
        422: 'Unprocessable Entity',
        500: 'Internal Server Error',
      });