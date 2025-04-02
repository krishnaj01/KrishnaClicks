if (process.env.NODE_ENV !== "production") {
    await import('dotenv/config');
}
import jwt from 'jsonwebtoken'

const adminCheck = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({ success: false, message: 'Not Authorized. Login Again.' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again.' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.username === process.env.ADMIN_USERNAME) {
            next();
        } else {
            return res.json({ success: false, message: 'Not Authorized. Login Again.' });
        }

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export default adminCheck;