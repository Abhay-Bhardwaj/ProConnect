import { Router } from 'express';
import { logIn, logOut, signUp, userInfo } from '../controllers/AuthController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';

const authRoutes = Router();


authRoutes.post('/signup', signUp);
authRoutes.post('/login', logIn);
authRoutes.get('/user-info',verifyToken, userInfo);
authRoutes.post('/logout',verifyToken, logOut);
  

export default authRoutes;