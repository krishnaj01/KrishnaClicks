if (process.env.NODE_ENV !== "production") {
    await import('dotenv/config');
}

import { SignJWT } from 'jose';

const encoder = new TextEncoder();

export const generateJWT = async (username) => {
    const secret = encoder.encode(process.env.JWT_SECRET);

    const token = await new SignJWT({ username })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret);

    return token;
}