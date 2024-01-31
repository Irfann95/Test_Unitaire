import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { NoTokenFoundError } from '../Error/NoTokenFoundError';
import { TokenError } from '../Error/TokenError';

export const tokenHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { headers } = req;
  if (headers.authorization) {
    const token = headers.authorization.split(' ')[1];
    verify(token, process.env.JWT_SECRET!, (err) => {
      if (err) {
        next(new TokenError(err.message));
      } else next();
    });
  } else {
    next(new NoTokenFoundError('No token found'));
  }
};
