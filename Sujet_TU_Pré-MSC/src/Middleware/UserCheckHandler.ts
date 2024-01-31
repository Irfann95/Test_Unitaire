import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { BadPermissionsError } from '../Error/BadPermissionsError';
import { UserNotFoundError } from '../Error/UserNotFoundError';
import { UserPublicProfile } from '../v1/models/userModel';
import { UserServiceImpl } from '../v1/services/userService';

export class UserCheckHandler {
  static isExistingUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    const userService = new UserServiceImpl();
    const userFound = await userService.getUserById(id);
    if (userFound === null) {
      next(new UserNotFoundError('User not found'));
    }
    next();
  };

  static isCorrectId = (req: Request, res: Response, next: NextFunction) => {
    const { headers } = req;
    const { id } = req.params;

    const token = headers.authorization!.split(' ')[1];
    const user = (verify(token, process.env.JWT_SECRET!) as any)
      .user as unknown as UserPublicProfile;
    if (user._id === id) {
      next();
    } else {
      next(new BadPermissionsError('Bad permissions'));
    }
  };
}
