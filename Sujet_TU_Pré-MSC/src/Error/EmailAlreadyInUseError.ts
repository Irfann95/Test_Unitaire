import httpStatus from 'http-status';
import { CustomError } from './CustomError';

export class EmailAlreadyInUseError extends CustomError {
  constructor(msg: string) {
    super(msg, httpStatus.BAD_REQUEST);
    Object.setPrototypeOf(this, EmailAlreadyInUseError.prototype);
  }
}
