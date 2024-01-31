/**
 * Express router for handling authentication routes.
 * @module AuthRouter
 */

import express from 'express';
import {
  validateLoginSchema,
  validateRegisterSchema,
} from '../../Middleware/RequestHandler';
import container from '../containers/container';
import { AuthController } from '../controllers/authController';

const authRouter = express();

const authController = container.resolve<AuthController>('authController');

/**
 * Route for registering a new user.
 * @name POST /register
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
authRouter.post(
  '/register',
  validateRegisterSchema,
  authController.registerUser.bind(authController),
);

/**
 * Route for logging in a user.
 * @name POST /login
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
authRouter.post(
  '/login',
  validateLoginSchema,
  authController.loginUser.bind(authController),
);

export default authRouter;
