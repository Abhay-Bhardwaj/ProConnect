import express from 'express';
import { applyForJob, CreateJob, getAllJobsList, getAppliedJobs, getJobDetails, getPostedJobs } from '../controllers/JobsController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';

const JobRoutes= express.Router();

JobRoutes.post('/create-job', verifyToken, CreateJob);
JobRoutes.get('/get-posted-job',verifyToken, getPostedJobs);
JobRoutes.get('/get-all-jobs', getAllJobsList);
JobRoutes.post('/apply-job',verifyToken, applyForJob);
JobRoutes.get('/get-applied-jobs',verifyToken, getAppliedJobs);
JobRoutes.get('/get-job-by-id/:jobId', getJobDetails);
// JobRoutes.get('/get-my-jobs',verifyToken, getMyJobs);

export default JobRoutes;