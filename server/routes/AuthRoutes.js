import { Router } from 'express';
import { logIn, signUp, userInfo } from '../controllers/AuthController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';

const authRoutes = Router();


authRoutes.post('/signup', signUp);
authRoutes.post('/login', logIn);
authRoutes.get('/user-info',verifyToken, userInfo);

export default authRoutes;