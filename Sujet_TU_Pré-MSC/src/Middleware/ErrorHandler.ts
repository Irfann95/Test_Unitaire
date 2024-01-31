import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { logger } from '../Config/winston';
import { CustomError } from '../Error/CustomError';
import { ValidatorError } from '../Error/ValidatorError';

export const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    logger.error(
      `\u001b[34m${req.method} \u001b[0m${req.url} \u001b[31m${err.status} \u001b[0m${err.message}`,
    );
    if (err instanceof ValidatorError)
      res.status(err.status).send({ message: err.message, errors: err.errors });
    else res.status(err.status).send({ message: err.message });
  }
};
