import httpStatus from 'http-status';
import { CustomError } from './CustomError';

export class TokenError extends CustomError {
  constructor(message: string) {
    super(message, httpStatus.UNAUTHORIZED);
    Object.setPrototypeOf(this, TokenError.prototype);
  }
}
