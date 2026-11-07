import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1 || isConnected) {
        return;
    }
    try {
        if (!process.env.MONGO_URI) {
            console.log("⚠️ MONGO_URI environment variable is missing.");
            return;
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log("✅ MongoDB Connected:", conn.connection.host);
    } catch (err) {
        console.log("❌ Database Connection Error:", err.message);
    }
};

export default connectDB;
