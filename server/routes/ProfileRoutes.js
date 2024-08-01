import { Router } from 'express';
import { verifyToken } from '../middlewares/AuthMiddleware.js';
import { updateProfile, userInfo } from '../controllers/ProfileController.js';

const profileRoutes = Router();


profileRoutes.get('/userInfo/:userName', userInfo);
profileRoutes.patch('/update-profile',verifyToken, updateProfile);

export default profileRoutes;