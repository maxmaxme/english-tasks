export enum ApiErrors {
  // eslint-disable-next-line no-unused-vars
  UNKNOWN_ERROR,
  // eslint-disable-next-line no-unused-vars
  INVALID_ACCESS_TOKEN,
  // eslint-disable-next-line no-unused-vars
  METHOD_ERROR,
  // eslint-disable-next-line no-unused-vars
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
