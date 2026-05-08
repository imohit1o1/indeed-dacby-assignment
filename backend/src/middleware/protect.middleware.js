import { verifyToken } from '../utils/jwt.js';
import { User } from '../models/user.model.js';

/**
 * Protect middleware
 * Extracts token from Authorization header (Bearer token)
 * Verifies token and finds user in database
 * Attaches full user object to req.user
 */
export async function protect(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: { message: "No token provided" }
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                error: { message: "No token provided" }
            });
        }

        const decodedToken = verifyToken(token);

        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(401).json({
                error: { message: "Invalid token" } // User might have been deleted
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ error: { message: 'Invalid token' } });
    }
}
