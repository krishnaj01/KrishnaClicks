import { deleteImage, getImageByUrl, getImages, getSingleImage, insertImage } from '../database/queries.js';
import { pool } from '../config/postgresNeon.js';
import { getCaptureDate } from '../utils/index.js';

export const getAllImages = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const offset = (page - 1) * limit;

        const { rows: images } = await pool.query(getImages, [offset, limit]);

        res.json({ success: true, images });
    } catch (err) {
        // console.log('Error fetching images in getAllImages controller');
        res.json({ success: false, message: err.message });
    }
}

export const getHomePageImages = async (req, res) => {
    try {
        const { rows: images } = await pool.query(getImages, [0, 6]);
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

        res.json({ success: true, message: 'Image removed successfully' });
    } catch (err) {
        // console.log('Error deleting image in removeImage controller');
        res.json({ success: false, message: err.message });
    }
}
