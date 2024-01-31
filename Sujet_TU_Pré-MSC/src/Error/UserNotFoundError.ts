import httpStatus from 'http-status';
import { CustomError } from './CustomError';

export class UserNotFoundError extends CustomError {
  constructor(msg: string) {
    super(msg, httpStatus.NOT_FOUND);
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
