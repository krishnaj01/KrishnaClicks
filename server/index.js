import express from 'express'
import connectDB from './config/mySQL.js';
import cors from 'cors'
import imageRouter from './routes/image.routes.js';
import { adminLogin } from './controllers/admin.controller.js';

const app = express()

const setUpApp = async (PORT) => {

    const frontendURL = process.env.FRONTEND_URL;

    app.use(express.json());

    app.use(cors({
        credentials: true,
        origin: frontendURL
    }));

    app.use('/api/images', imageRouter);

    app.post('/api/admin-login', adminLogin);

    app.get('/', (req, res) => {
        res.send(`HELLO FROM KRISHNACLICKS BACKEND!`)
    });
}

async function dotenvLoad() {
    if (process.env.NODE_ENV !== "production") {
        await import('dotenv/config');
    }
    const PORT = process.env.PORT || 3000;

    try {
        const db = await connectDB();
        await setUpApp(PORT);
        app.listen(PORT, () => {
            console.log(`Serving on port ${PORT}`);
        });
        return db;
    } catch (error) {
        console.log(error);
    }
}

export const db = await dotenvLoad();