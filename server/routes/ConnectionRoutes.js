import express from 'express';
import { acceptConnectionRequest, declineConnectionRequest, listConnections, sendConnectionRequest, followUser,unfollowUser, GetAllUsers, getFollowersFollowing } from '../controllers/ConnectionController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';



const ConnectionRoutes = express.Router();

ConnectionRoutes.post('/send', verifyToken, sendConnectionRequest);
ConnectionRoutes.post('/accept', verifyToken, acceptConnectionRequest);
ConnectionRoutes.post('/decline', verifyToken, declineConnectionRequest);
ConnectionRoutes.get('/list', verifyToken, listConnections);
ConnectionRoutes.get('/allUsers', verifyToken, GetAllUsers);
ConnectionRoutes.patch('/follow/:id', verifyToken, followUser);
ConnectionRoutes.patch('/unfollow/:id', verifyToken, unfollowUser);
ConnectionRoutes.get('/getsepratelist', verifyToken, getFollowersFollowing);

export default ConnectionRoutes;