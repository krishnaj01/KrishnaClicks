if (process.env.NODE_ENV !== "production") {
    await import('dotenv/config');
}

import jwt from 'jsonwebtoken';

export const generateJWT = (username) => {
    const token = jwt.sign({username} , process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    return token;
}