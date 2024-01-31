import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import { ValidatorError } from '../Error/ValidatorError';
import { loginUserSchemaBody } from '../Validators/loginUserSchema';
import {
  registerUserSchemaBody,
  registerUserSchemaHeaders,
} from '../Validators/registerUserSchema';

export const validateRegisterSchema = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body, headers } = req;

  try {
    registerUserSchemaBody.validateSync(body, {
      abortEarly: false,
      stripUnknown: true,
    });
    registerUserSchemaHeaders.validateSync(headers, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (e) {
    const error = e as ValidationError;
    next(
      new ValidatorError(
        'Errors occured while checking register schema',
        error.errors,
      ),
    );
  }
  next();
};

export const validateLoginSchema = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  try {
    loginUserSchemaBody.validateSync(body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (e) {
    const error = e as ValidationError;
    next(
      new ValidatorError(
        'Errors occured while checking login schema',
        error.errors,
      ),
    );
  }
  next();
};
