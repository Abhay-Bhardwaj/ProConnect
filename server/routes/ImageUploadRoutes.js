import express from 'express';
import { CompanyProfileImageUpload, UploadProfileImage } from '../controllers/ImageUploadContoller.js';

const ImageRouter = express.Router();

ImageRouter.post('ptofile-image', UploadProfileImage);
ImageRouter.post('cover-image',);
ImageRouter.post('post-image',ProfileUploader);
ImageRouter.post('company-logo',CompanyProfileImageUpload);