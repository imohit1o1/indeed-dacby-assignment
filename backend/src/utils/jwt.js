import jwt from 'jsonwebtoken';

// sign the token
export function signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "24h"
    })
}

// verify the token
export function verifyToken(token) {
    if (!token) {
        throw new Error('No token provided');
    }
    return jwt.verify(token, process.env.JWT_SECRET)
}