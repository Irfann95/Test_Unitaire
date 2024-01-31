import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { BadPermissionsError } from '../Error/BadPermissionsError';
import { UserPublicProfile } from '../v1/models/userModel';

export class rolesHandler {
  static isUser = (req: Request, res: Response, next: NextFunction) => {
    const { headers } = req;
    const token = headers.authorization!.split(' ')[1];
    const user: UserPublicProfile = (
      verify(token, process.env.JWT_SECRET!) as any
    ).user as unknown as UserPublicProfile;
    const { roles } = user;
    if (roles.includes('lfm:user')) {
      next();
    } else {
      next(new BadPermissionsError('Bad permissions'));
    }
  };
}
