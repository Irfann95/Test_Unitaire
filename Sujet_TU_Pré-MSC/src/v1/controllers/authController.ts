import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { omit } from 'lodash';
import { EmailAlreadyInUseError } from '../../Error/EmailAlreadyInUseError';
import { UserNotFoundError } from '../../Error/UserNotFoundError';
import { WrongPasswordError } from '../../Error/WrongPasswordError';
import { UserPublicProfile } from '../models/userModel';
import { UserService } from '../services/userService';

export class AuthController {
  constructor(private userService: UserService) {}

  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const user = req.body;
    user.locale = req.headers['accept-language']!.split(',')[0];
    user.profile_picture = `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`;
    user.banned = false;
    user.roles = ['lfm:user'];
    const cryptedPassword = bcrypt.hashSync(user.password, 10);
    user.password = cryptedPassword;
    if ((await this.userService.getUserByEmail(user.email)) !== null) {
      next(new EmailAlreadyInUseError('Email already in use'));
      return;
    }
    await this.userService.createUser(user);
    res
      .status(httpStatus.CREATED)
      .send({ message: 'User successfully created' });
  }

  async loginUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const user = req.body;
    const userFound = await this.userService.getUserByEmail(user.email);
    if (userFound === null) {
      next(new UserNotFoundError('User not found'));
      return;
    }
    if (!bcrypt.compareSync(user.password, userFound!.password)) {
      next(new WrongPasswordError('Wrong password'));
      return;
    }
    const userProfile: UserPublicProfile = omit(userFound, [
      'password',
      'email',
    ]);
    res.status(httpStatus.OK).send({
      message: 'User successfully logged',
      user: userProfile,
      token: jwt.sign({ user: userProfile }, process.env.JWT_SECRET!),
    });
  }
}
