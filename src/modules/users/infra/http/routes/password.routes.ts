import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passowordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passowordRouter.post('/forgot', forgotPasswordController.create);
passowordRouter.post('/reset', resetPasswordController.create);

export default passowordRouter;
