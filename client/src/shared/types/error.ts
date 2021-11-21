export enum ApiErrors {
  UNKNOWN_ERROR,
  INVALID_ACCESS_TOKEN,
  METHOD_ERROR,
}

export class ApiError extends Error {
  code;
  constructor(code: number, message = '') {
    message = {
      [ApiErrors.INVALID_ACCESS_TOKEN]: 'Invalid access token',
      [ApiErrors.UNKNOWN_ERROR]: 'Unknown error',
    }[code] || message;

    super(message);
    this.code = code;
  }
}
