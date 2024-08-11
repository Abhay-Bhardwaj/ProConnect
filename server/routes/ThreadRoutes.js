import express from 'express';
import { getMessages, getThreads, newGroupThread, newIndividualThread, newMessage } from '../controllers/ThreadsController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';

const ThreadRoutes = express.Router();


ThreadRoutes.get('/get-threads',verifyToken, getThreads);
ThreadRoutes.post('/create-group',verifyToken, newGroupThread);
ThreadRoutes.post('/create-individual',verifyToken, newIndividualThread);
ThreadRoutes.post('/new-message',verifyToken, newMessage);
ThreadRoutes.get('/get-messages/:id',verifyToken, getMessages);


export default ThreadRoutes;
