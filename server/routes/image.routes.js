import express from 'express';
import { addImage, getAllImages, getHomePageImages, removeImage } from '../controllers/image.controller.js';
import adminCheck from '../middleware/adminCheck.js';

const imageRouter = express.Router();

imageRouter.get('/all-images', getAllImages);
imageRouter.get('/home-page-images', getHomePageImages);

imageRouter.post('/add-image', adminCheck, addImage);
imageRouter.post('/delete-image/:id', adminCheck, removeImage);

export default imageRouter;