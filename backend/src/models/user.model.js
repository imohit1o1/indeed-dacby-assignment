import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User Schema for authentication and bookmarks
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: [3, "Username must be at least 3 characters"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
    }]
}, {
    timestamps: true
});

userSchema.pre('save', async function () {

    // Only hash if password is modified
    if (!this.isModified('password')) {
        return; // Just return, don't call next()
    }

    try {
        //  Hash password
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        throw error;
    }
});

userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

export const User = mongoose.model('User', userSchema);