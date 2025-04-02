import express from 'express';
import { addImage, getAllImages, getHomePageImages, removeImage } from '../controllers/image.controller.js';

const imageRouter = express.Router();

imageRouter.get('/all-images', getAllImages);

imageRouter.post('/add-image', addImage);
imageRouter.post('/delete-image/:id', removeImage);
imageRouter.get('/home-page-images', getHomePageImages);

export default imageRouter;