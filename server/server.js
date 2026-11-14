import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import ProjectRoutes from "./routes/ProjectRoutes.js";
import ExecutionRoutes from "./routes/ExecutionRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials: true,
}));

app.use(express.json());

// Ensure database is connected before handling API requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("Database connection failed:", err);

        return res.status(503).json({
            success: false,
            message: "Database connection failed. Please try again later."
        });
    }
});

app.use("/api/auth", AuthRoutes);
app.use("/api/projects", ProjectRoutes);
app.use("/api/execute", ExecutionRoutes);

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "CodingAdda API is running" });
});

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;
