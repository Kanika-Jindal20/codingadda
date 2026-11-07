import Project from "../models/Project.js";

// Helper to return initial template files based on project language
export const getDefaultFiles = (language) => {
    const lang = (language || "").toLowerCase();
    switch (lang) {
        case "python":
            return [
                {
                    name: "main.py",
                    content: `# Python in CodingAdda\nprint("Hello, CodingAdda!")\n`,
                    language: "python",
                },
            ];
        case "c++":
        case "cpp":
            return [
                {
                    name: "main.cpp",
                    content: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, CodingAdda!" << std::endl;\n    return 0;\n}\n`,
                    language: "cpp",
                },
            ];
        case "c":
            return [
                {
                    name: "main.c",
                    content: `#include <stdio.h>\n\nint main() {\n    printf("Hello, CodingAdda!\\n");\n    return 0;\n}\n`,
                    language: "c",
                },
            ];
        case "java":
            return [
                {
                    name: "Main.java",
                    content: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, CodingAdda!");\n    }\n}\n`,
                    language: "java",
                },
            ];
        case "html":
            return [
                {
                    name: "index.html",
                    content: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>CodingAdda Project</title>\n</head>\n<body>\n  <h1>Hello, CodingAdda!</h1>\n  <p>Start editing your HTML and CSS code.</p>\n</body>\n</html>\n`,
                    language: "html",
                },
                {
                    name: "style.css",
                    content: `body {\n  font-family: Arial, sans-serif;\n  background-color: #0b1220;\n  color: #d7e1ee;\n  padding: 24px;\n}\n\nh1 {\n  color: #60a5fa;\n}\n`,
                    language: "css",
                },
            ];
        case "css":
            return [
                {
                    name: "style.css",
                    content: `body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n}\n`,
                    language: "css",
                },
            ];
        case "ruby":
            return [
                {
                    name: "main.rb",
                    content: `puts "Hello, CodingAdda!"\n`,
                    language: "ruby",
                },
            ];
        case "go":
            return [
                {
                    name: "main.go",
                    content: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, CodingAdda!")\n}\n`,
                    language: "go",
                },
            ];
        case "rust":
            return [
                {
                    name: "main.rs",
                    content: `fn main() {\n    println!("Hello, CodingAdda!");\n}\n`,
                    language: "rust",
                },
            ];
        case "php":
            return [
                {
                    name: "main.php",
                    content: `<?php\necho "Hello, CodingAdda!\\n";\n`,
                    language: "php",
                },
            ];
        case "typescript":
            return [
                {
                    name: "main.ts",
                    content: `const message: string = "Hello, CodingAdda!";\nconsole.log(message);\n`,
                    language: "typescript",
                },
            ];
        case "javascript":
        default:
            return [
                {
                    name: "main.js",
                    content: `// Welcome to CodingAdda\nconsole.log("Hello, CodingAdda!");\n`,
                    language: "javascript",
                },
            ];
    }
};

// Create a new project
export const createProject = async (req, res) => {
    try {
        const { name, language, files } = req.body;

        if (!name || !language) {
            return res.status(400).json({
                success: false,
                message: "Project name and language are required.",
            });
        }

        const project = new Project({
            name,
            language,
            owner: req.user.id,
            files: Array.isArray(files) && files.length > 0 ? files : getDefaultFiles(language),
        });

        await project.save();

        res.status(201).json({
            success: true,
            message: "Project created successfully.",
            project,
        });

    } catch (err) {
        console.log("Create project error:", err);

        res.status(500).json({
            success: false,
            message: "Server error.",
        });
    }
};

// Get all projects of logged-in user
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            owner: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            projects,
        });

    } catch (err) {
        console.log("Get projects error:", err);

        res.status(500).json({
            success: false,
            message: "Server error.",
        });
    }
};

// Delete a project
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id,
            owner: req.user.id,
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });
        }

        await Project.deleteOne({
            _id: req.params.id,
            owner: req.user.id,
        });

        res.status(200).json({
            success: true,
            message: "Project deleted successfully.",
        });

    } catch (err) {
        console.log("Delete project error:", err);

        res.status(500).json({
            success: false,
            message: "Server error.",
        });
    }
};

// Update a project
export const updateProject = async (req, res) => {
    try {
        const { name, language } = req.body;

        if (!name || !language) {
            return res.status(400).json({
                success: false,
                message: "Project name and language are required.",
            });
        }

        const project = await Project.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.user.id,
            },
            {
                name,
                language,
            },
            {
                new: true,
            }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Project updated successfully.",
            project,
        });

    } catch (err) {
        console.log("Update project error:", err);

        res.status(500).json({
            success: false,
            message: "Server error.",
        });
    }
};

// Get a single project by ID (ensuring ownership and providing default files if empty)
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id,
            owner: req.user.id,
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found or you do not have permission to view it.",
            });
        }

        // Backwards compatibility: if project has no files saved yet, populate defaults
        if (!project.files || project.files.length === 0) {
            project.files = getDefaultFiles(project.language);
            await project.save();
        }

        res.status(200).json({
            success: true,
            project,
        });

    } catch (err) {
        console.log("Get project by ID error:", err);

        res.status(500).json({
            success: false,
            message: "Server error while fetching project.",
        });
    }
};

// Save files for a project
export const saveProjectFiles = async (req, res) => {
    try {
        const { files } = req.body;

        if (!Array.isArray(files)) {
            return res.status(400).json({
                success: false,
                message: "Files must be provided as an array.",
            });
        }

        // Validate each file
        for (const file of files) {
            if (!file || typeof file.name !== "string" || !file.name.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Each file must have a non-empty name.",
                });
            }

            // Sanitize against path traversal characters
            if (file.name.includes("..") || file.name.includes("/") || file.name.includes("\\")) {
                return res.status(400).json({
                    success: false,
                    message: "File names must not contain path traversal characters (/ or \\ or ..).",
                });
            }
        }

        // Check for duplicate names
        const names = files.map((f) => f.name.toLowerCase().trim());
        if (new Set(names).size !== names.length) {
            return res.status(400).json({
                success: false,
                message: "Duplicate file names are not allowed in the same project.",
            });
        }

        const project = await Project.findOne({
            _id: req.params.id,
            owner: req.user.id,
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found or you do not have permission to edit it.",
            });
        }

        project.files = files;
        await project.save();

        res.status(200).json({
            success: true,
            message: "Project files saved successfully.",
            files: project.files,
        });

    } catch (err) {
        console.log("Save project files error:", err);

        res.status(500).json({
            success: false,
            message: "Server error while saving project files.",
        });
    }
};