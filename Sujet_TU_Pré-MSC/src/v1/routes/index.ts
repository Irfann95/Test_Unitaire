import express from 'express';
import authRouter from './authRoute';
import userRouter from './userRoute';

const router = express();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
