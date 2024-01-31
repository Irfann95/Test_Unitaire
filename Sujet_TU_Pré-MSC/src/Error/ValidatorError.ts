import httpStatus from 'http-status';
import { CustomError } from './CustomError';

export class ValidatorError extends CustomError {
  public errors: Array<string>;
  constructor(msg: string, errors: Array<string>) {
    super(msg, httpStatus.BAD_REQUEST);
    this.errors = errors;
    Object.setPrototypeOf(this, ValidatorError.prototype);
  }
}
