import bcrypt from 'bcrypt';
import { db } from '../index.js';
import { checkAdmin } from '../database/queries.js';
import { generateJWT } from '../utils/generateJWT.js';

export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!username || !password) {
            return res.json({ success: false, message: 'Please provide username and password' });
        }

        const [admin] = await db.query(checkAdmin, [username]);
        if(!admin.length) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const isAdmin = await bcrypt.compare(password, admin[0].password);

        if(!isAdmin) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateJWT(admin[0].username);

        res.json({ success: true, message: 'Login successful', admin: admin[0].username, jwt: token });

    } catch (error) {
        // console.log('Error in adminLogin controller');
        res.json({ success: false, message: err.message });
    }
}