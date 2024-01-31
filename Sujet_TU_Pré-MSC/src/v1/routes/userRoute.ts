/**
 * This file contains the user routes for the web server.
 * It defines the routes related to user operations such as creating, retrieving, and updating user profiles.
 * The routes are protected by middleware functions that handle token verification, role checking, and user ID validation.
 * The user routes are implemented using the Express framework.
 * @module userRoute
 */

import express from 'express';
import { idCheckHandler } from '../../Middleware/IdCheckHandler';
import { rolesHandler } from '../../Middleware/RolesHandler';
import { tokenHandler } from '../../Middleware/TokenHandler';
import { UserCheckHandler } from '../../Middleware/UserCheckHandler';
import container from '../containers/container';
import { UserController } from '../controllers/userController';

const userRouter = express();

const userController = container.resolve<UserController>('userController');

/**
 * Route for retrieving a user profile.
 * Requires token verification, user role checking, and user ID validation.
 * @name GET /:id
 * @function
 * @memberof module:userRoute
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
userRouter.get(
  '/:id',
  tokenHandler,
  rolesHandler.isUser,
  idCheckHandler,
  UserCheckHandler.isExistingUser,
  userController.getProfile.bind(userController),
);

/**
 * Route for updating a user profile.
 * Requires token verification, user role checking, user ID validation, and input validation.
 * @name PUT /:id
 * @function
 * @memberof module:userRoute
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
userRouter.put(
  '/:id',
  tokenHandler,
  rolesHandler.isUser,
  idCheckHandler,
  UserCheckHandler.isExistingUser,
  UserCheckHandler.isCorrectId,
  userController.updateProfile.bind(userController),
);

export default userRouter;
