import express from "express";
import authMiddleware from "../middleware/AuthMiddleware.js";
import { executeCode } from "../controllers/ExecutionController.js";

const router = express.Router();

// Protected execution route
router.post("/", authMiddleware, executeCode);

export default router;
