import express from 'express';
import { createCompany, getAllCompanies, getCompany } from '../controllers/CompanyController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';

const CompanyRoutes = express.Router();

CompanyRoutes.get('/get-companies', getAllCompanies);
CompanyRoutes.get('/get-company-by-id', getCompany);
CompanyRoutes.post('/create-company',verifyToken, createCompany);

export default CompanyRoutes;
