import mongoose from 'mongoose';

const connectDB = async (uri) => {
    try {
        if (!uri) {
            throw new Error("MONGODB URI is not provided")
        }
        const conn = await mongoose.connect(uri);

        console.log('✓ MongoDB connected successfully');
        return conn;
    } catch (error) {
        console.error('✗ MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;
