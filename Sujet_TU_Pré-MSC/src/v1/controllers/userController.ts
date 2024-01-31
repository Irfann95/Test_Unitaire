import { NextFunction, Request, Response } from 'express';
import { omit } from 'lodash';
import { UserPublicProfile } from '../models/userModel';
import { UserService } from '../services/userService';

export class UserController {
  constructor(private userService: UserService) {}

  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { id } = req.params;
    const userFound = await this.userService.getUserById(id);
    const userProfile: UserPublicProfile = omit(userFound, [
      'password',
      'email',
    ]);
    res.status(200).send({ message: 'User found', user: userProfile });
  }

  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { id } = req.params;
    const user = req.body;
    const userUpdated = await this.userService.updateUserById(id, user);
    res
      .status(200)
      .send({ message: 'User successfully updated', user: userUpdated });
  }
}
