import httpStatus from 'http-status';
import { CustomError } from './CustomError';

export class NoTokenFoundError extends CustomError {
  constructor(message: string) {
    super(message, httpStatus.UNAUTHORIZED);
    Object.setPrototypeOf(this, NoTokenFoundError.prototype);
  }
}
