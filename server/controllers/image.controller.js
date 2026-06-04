import { deleteImage, getAllImages as getAllImagesQuery, getImageByUrl, getImages, getSingleImage, insertImage } from '../database/queries.js';
import { pool } from '../config/postgresNeon.js';
import { redisClient } from '../config/redis.js';
import { getCaptureDate } from '../utils/index.js';

const parseCachedImages = (cachedValue) => {
    if (!cachedValue) return null;

    const parsedValue = JSON.parse(cachedValue);
    if (Array.isArray(parsedValue)) return parsedValue;
    if (parsedValue && Array.isArray(parsedValue.images)) return parsedValue.images;

    return null;
};

export const getAllImages = async (req, res) => {
    try {
        const cachedImages = await redisClient.get('all_images');

        if (cachedImages) {
            const images = parseCachedImages(cachedImages);
            if (images) {
                return res.json({ success: true, images });
            }

            await redisClient.del('all_images');
        }

        const { rows: images } = await pool.query(getAllImagesQuery);

        await redisClient.set('all_images', JSON.stringify(images)); // Cache without expiration, will be cleared when images are added/removed

        res.json({ success: true, images });
    } catch (err) {
        // console.log('Error fetching images in getAllImages controller');
        res.json({ success: false, message: err.message });
    }
}

export const getHomePageImages = async (req, res) => {
    try {
        const cachedHomePageImages = await redisClient.get('home_page_images');

        if (cachedHomePageImages) {
            const images = parseCachedImages(cachedHomePageImages);
            if (images) {
                return res.json({ success: true, images });
            }

            await redisClient.del('home_page_images');
        }

        const { rows: images } = await pool.query(getImages, [0, 6]);
        await redisClient.set('home_page_images', JSON.stringify(images)); // Cache without expiration, will be cleared when images are added/removed
        res.json({ success: true, images });
    } catch (err) {
        // console.log('Error fetching images in getHomePageImages controller');
        res.json({ success: false, message: err.message });
    }
}


export const addImage = async (req, res) => {
    try {
        // Support multiple images
        const { img_urls } = req.body;

        const urls = [];
        if (Array.isArray(img_urls)) urls.push(...img_urls);

        if (!urls.length) {
            return res.json({ success: false, message: 'No image(s) provided' });
        }

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const inserted = [];
            const skipped = [];

            for (const url of urls) {
                const { rows: exists } = await client.query(getImageByUrl, [url]);
                if (exists.length) {
                    skipped.push({ url, reason: 'already_exists' });
                    continue;
                }

                const date = await getCaptureDate(url);
                const { rows: newRows } = await client.query(insertImage, [url, date]);
                if (newRows && newRows[0]) inserted.push(newRows[0]);
            }

            await client.query('COMMIT');

            await redisClient.del('all_images', 'home_page_images');

            res.status(201).json({ success: true, inserted, skipped, message: `${inserted.length} image(s) added, ${skipped.length} image(s) skipped` });
        } catch (txErr) {
            await client.query('ROLLBACK');
            throw txErr;
        } finally {
            client.release();
        }
    } catch (err) {
        // console.log('Error adding image in addImage controller');
        res.json({ success: false, message: err.message });
    }
}


export const removeImage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.json({ success: false, message: 'No id provided' });
        }

        const { rows: image } = await pool.query(getSingleImage, [id]);

        if (!image.length) {
            return res.json({ success: false, message: 'Image not found' });
        }

        await pool.query(deleteImage, [id]);

        await redisClient.del('all_images', 'home_page_images');

        res.json({ success: true, message: 'Image removed successfully' });
    } catch (err) {
        // console.log('Error deleting image in removeImage controller');
        res.json({ success: false, message: err.message });
    }
}
