import { User } from '../models/user.model.js';
import { signToken } from '../utils/jwt.js';

// register a user
export async function register(req, res, next) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: { message: "All fields are required" } });
        }

        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(409).json({
                error: { message: "Username already exists" }
            })
        }

        const user = await User.create({
            username,
            password
        });
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return res.status(201).json({
            message: "User registered successfully!",
            user: userWithoutPassword
        });
    } catch (error) {
        next(error);
    }
}

// login user
export async function login(req, res, next) {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ error: { message: "All fields are required" } });
        }

        const user = await User.findOne({ username }).select("+password");
        if (!user) {
            return res.status(401).json({
                error: { message: "Invalid credentials" }
            })
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: { message: "Invalid credentials" } });
        }

        const token = await signToken({
            userId: user._id,
            username: user.username,
        });


        // Exclude password from returned user object
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return res.status(200).json({
            token,
            user: userWithoutPassword
        })

    } catch (error) {
        next(error);
    }
}