export enum ApiErrors {
  UNKNOWN_ERROR,
  INVALID_ACCESS_TOKEN,
  METHOD_ERROR,
  UNKNOWN_METHOD,
}

export class ApiError extends Error {
  code;
  constructor(code: number, message = '') {
    message = {
      [ApiErrors.INVALID_ACCESS_TOKEN]: 'Invalid access token',
      [ApiErrors.UNKNOWN_ERROR]: 'Unknown error',
      [ApiErrors.UNKNOWN_METHOD]: 'Unknown method',
    }[code] || message;

    super(message);
    this.code = code;
  }

  toObject() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
