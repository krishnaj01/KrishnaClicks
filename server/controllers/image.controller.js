import { deleteImage, getImageByUrl, getImages, getSingleImage, insertImage } from '../database/queries.js';
import { db } from '../index.js';
import { getCaptureDate } from '../utils/index.js';

export const getAllImages = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const offset = (page - 1) * limit;

        const [images] = await db.query(getImages, [offset, limit]);

        res.json({ success: true, images });
    } catch (err) {
        console.log('Error fetching images in getAllImages controller');
        res.json({ success: false, message: err.message });
    }
}

export const getHomePageImages = async (req, res) => {
    try {
        const [images] = await db.query(getImages, [0, 6]);
        res.json({ success: true, images });
    } catch (err) {
        console.log('Error fetching images in getHomePageImages controller');
        res.json({ success: false, message: err.message });
    }
}


export const addImage = async (req, res) => {
    try {
        const { img_url } = req.body;

        if (!img_url) {
            return res.json({ success: false, message: 'No image provided' });
        }

        const [existingImage] = await db.query(getImageByUrl, [img_url]);
        if (existingImage.length) {
            return res.json({ success: false, message: 'Image already exists' });
        }

        const date = await getCaptureDate(img_url);

        await db.query(insertImage, [img_url, date]);

        const [newImage] = await db.query(getImageByUrl, [img_url]);

        res.status(201).json({ success: true, message: 'Image added successfully', image: newImage[0] });
    } catch (err) {
        console.log('Error adding image in addImage controller');
        console.log(err);
        res.json({ success: false, message: err.message });
    }
}


export const removeImage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.json({ success: false, message: 'No id provided' });
        }

        const [image] = await db.query(getSingleImage, [id]);

        if (!image.length) {
            return res.json({ success: false, message: 'Image not found' });
        }

        await db.query(deleteImage, [id]);

        res.json({ success: true, message: 'Image removed successfully' });
    } catch (err) {
        console.log('Error deleting image in removeImage controller');
        res.json({ success: false, message: err.message });
    }
}
