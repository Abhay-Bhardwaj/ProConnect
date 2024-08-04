import { Router } from 'express';
import { verifyToken } from '../middlewares/AuthMiddleware.js';
import { updateProfile, uploadProfileImage, userInfo } from '../controllers/ProfileController.js';
import upload from '../middlewares/upload.js';

const profileRoutes = Router();


profileRoutes.get('/userInfo/:userName', userInfo);
profileRoutes.patch('/update-profile',verifyToken, updateProfile);
profileRoutes.patch('/upload-profile-image',verifyToken, upload.single('image'), uploadProfileImage);

export default profileRoutes;