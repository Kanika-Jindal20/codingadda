import express from "express";
import authMiddleware from "../middleware/AuthMiddleware.js";
import {
    createProject,
    getProjects,
    getProjectById,
    saveProjectFiles,
    deleteProject,
    updateProject
} from "../controllers/ProjectController.js";

const router = express.Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProjectById);
router.put("/:id/files", authMiddleware, saveProjectFiles);
router.delete("/:id", authMiddleware, deleteProject);
router.put("/:id", authMiddleware, updateProject);

export default router;