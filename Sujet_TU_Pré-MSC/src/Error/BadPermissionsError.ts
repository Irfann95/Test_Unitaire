import httpStatus from 'http-status';
import { CustomError } from './CustomError';

export class BadPermissionsError extends CustomError {
  constructor(msg: string) {
    super(msg, httpStatus.UNAUTHORIZED);
    Object.setPrototypeOf(this, BadPermissionsError.prototype);
  }
}
