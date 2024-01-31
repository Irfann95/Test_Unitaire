import { NextFunction, Request, Response } from 'express';
import { UserNotFoundError } from '../Error/UserNotFoundError';

export const idCheckHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  if (id.length !== 24) {
    next(new UserNotFoundError('Id is not valid'));
  } else {
    next();
  }
};
