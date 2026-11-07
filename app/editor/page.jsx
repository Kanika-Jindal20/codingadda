"use client";

import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Editor from "@monaco-editor/react";
import {
    FiPlay,
    FiSave,
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiRefreshCw,
    FiX,
    FiCheck,
    FiAlertCircle,
    FiTerminal,
    FiFolder,
    FiEye,
    FiArrowLeft,
    FiExternalLink
} from "react-icons/fi";
import {
    LANGUAGE_CONFIG,
    getFileExtension,
    getFileLanguageConfig
} from "./languageConfig.js";
import { API_BASE_URL } from "../../lib/config.js";
import "./editor.css";

const DEFAULT_PLAYGROUND_FILES = [
    {
        name: "index.html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodingAdda Live Site</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="card">
    <h1>🚀 CodingAdda Live Site</h1>
    <p>Edit HTML, CSS, and JavaScript in real-time!</p>
    <button id="clickBtn">Click Me</button>
    <div id="output"></div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
        language: "html",
    },
    {
        name: "style.css",
        content: `body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #0d2035, #1e3a8a);
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.card {
  background: #ffffff;
  color: #1e293b;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  text-align: center;
  max-width: 450px;
}

h1 {
  color: #2563ab;
  margin-top: 0;
}

button {
  background: #2563ab;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
  transition: 0.2s;
}

button:hover {
  background: #1d4ed8;
}

#output {
  margin-top: 15px;
  font-weight: bold;
  color: #059669;
}`,
        language: "css",
    },
    {
        name: "script.js",
        content: `let count = 0;
const btn = document.getElementById("clickBtn");
const output = document.getElementById("output");

if (btn && output) {
  btn.addEventListener("click", () => {
    count++;
    output.innerText = \`Button clicked \${count} times!\`;
  });
}`,
        language: "javascript",
    },
];

function EditorComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectId = searchParams.get("id");

    // Project state
    const [project, setProject] = useState(null);
    const [projectName, setProjectName] = useState("Loading Project...");
    const [files, setFiles] = useState([]);
    const [activeFileName, setActiveFileName] = useState("");
    const [openTabs, setOpenTabs] = useState([]);
    const [unsavedFiles, setUnsavedFiles] = useState(new Set());
    const [saveStatus, setSaveStatus] = useState("saved"); // "saved" | "unsaved" | "saving" | "failed"
    const [isLoadingProject, setIsLoadingProject] = useState(true);
    const [projectError, setProjectError] = useState("");

    // Bottom panel state
    const [activeBottomTab, setActiveBottomTab] = useState("output"); // "output" | "input" | "preview" | "problems"
    const [stdin, setStdin] = useState("");
    const [output, setOutput] = useState("");
    const [executionStatus, setExecutionStatus] = useState("idle"); // "idle" | "running" | "success" | "error"
    const [executionStats, setExecutionStats] = useState(null);
    const [problems, setProblems] = useState([]);
    const [previewKey, setPreviewKey] = useState(0);

    // Editor position & Monaco reference
    const [cursorPosition, setCursorPosition] = useState({ line: 1, col: 1 });
    const editorRef = useRef(null);

    // Modals state
    const [showNewFileModal, setShowNewFileModal] = useState(false);
    const [newFileName, setNewFileName] = useState("");
    const [newFileError, setNewFileError] = useState("");

    const [showRenameModal, setShowRenameModal] = useState(false);
    const [renameTarget, setRenameTarget] = useState("");
    const [newRenameName, setNewRenameName] = useState("");
    const [renameError, setRenameError] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState("");

    // Current active file object
    const activeFile = files.find((f) => f.name === activeFileName) || null;
    const activeConfig = activeFile ? getFileLanguageConfig(activeFile.name) : getFileLanguageConfig("file.txt");

    // ----------------------------------------------------
    // 1. Fetch Project from Backend
    // ----------------------------------------------------
    const fetchProject = useCallback(async () => {
        if (!projectId) {
            // Check if user is logged in and has an existing project
            const token = localStorage.getItem("codingaddaToken");
            if (token) {
                try {
                    const res = await fetch(`${API_BASE_URL}/api/projects`, {
                        method: "GET",
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const resData = await res.json();
                    if (res.ok && resData.success && resData.projects && resData.projects.length > 0) {
                        router.replace(`/editor?id=${resData.projects[0]._id}`);
                        return;
                    }
                } catch (e) {
                    console.log("Auto-project check error:", e);
                }
            }

            // Otherwise, load default live web playground
            setProjectName("Web Playground");
            setFiles(DEFAULT_PLAYGROUND_FILES);
            setActiveFileName("index.html");
            setOpenTabs(["index.html", "style.css", "script.js"]);
            setIsLoadingProject(false);
            return;
        }

        try {
            setIsLoadingProject(true);
            setProjectError("");

            const token = localStorage.getItem("codingaddaToken");
            if (!token) {
                router.push("/login");
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                setProjectError(data.message || "Could not load the requested project.");
                setIsLoadingProject(false);
                return;
            }

            const proj = data.project;
            setProject(proj);
            setProjectName(proj.name);

            const projectFiles = proj.files && proj.files.length > 0 ? proj.files : [];
            setFiles(projectFiles);

            if (projectFiles.length > 0) {
                const initialFile = projectFiles[0].name;
                setActiveFileName(initialFile);
                setOpenTabs([initialFile]);
            }

            setIsLoadingProject(false);
        } catch (err) {
            console.error("Fetch project error:", err);
            setProjectError("Failed to connect to the backend server. Please make sure the server is running.");
            setIsLoadingProject(false);
        }
    }, [projectId, router]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    // ----------------------------------------------------
    // 2. Editor Handlers
    // ----------------------------------------------------
    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;

        // Track cursor position
        editor.onDidChangeCursorPosition((e) => {
            setCursorPosition({
                line: e.position.lineNumber,
                col: e.position.column,
            });
        });

        // Keyboard shortcut: Ctrl+S / Cmd+S inside editor
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            handleSave();
        });
    };

    // Global keyboard shortcut for Ctrl+S
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                handleSave();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [files, activeFileName, projectId]);

    const handleCodeChange = (newCode) => {
        if (!activeFileName) return;

        setFiles((prevFiles) =>
            prevFiles.map((file) =>
                file.name === activeFileName
                    ? { ...file, content: newCode }
                    : file
            )
        );

        setUnsavedFiles((prev) => {
            const next = new Set(prev);
            next.add(activeFileName);
            return next;
        });

        setSaveStatus("unsaved");
    };

    // ----------------------------------------------------
    // 3. Save Files to MongoDB Backend
    // ----------------------------------------------------
    const handleSave = async () => {
        if (!projectId) {
            const token = localStorage.getItem("codingaddaToken");
            if (!token) {
                alert("Please log in to save projects to your cloud account.");
                router.push("/login");
            } else {
                alert("You are currently using the interactive Playground. Go to 'My Projects' to create and save named projects.");
                router.push("/projects");
            }
            return;
        }

        try {
            setSaveStatus("saving");

            const token = localStorage.getItem("codingaddaToken");
            if (!token) {
                router.push("/login");
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}/files`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ files }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                setSaveStatus("failed");
                console.error("Save error:", data.message);
                return;
            }

            setUnsavedFiles(new Set());
            setSaveStatus("saved");
        } catch (err) {
            console.error("Save files network error:", err);
            setSaveStatus("failed");
        }
    };

    // ----------------------------------------------------
    // 4. Tab & File Navigation
    // ----------------------------------------------------
    const handleSelectFile = (fileName) => {
        if (!openTabs.includes(fileName)) {
            setOpenTabs((prev) => [...prev, fileName]);
        }
        setActiveFileName(fileName);
    };

    const handleCloseTab = (fileName, e) => {
        e.stopPropagation();

        const updatedTabs = openTabs.filter((t) => t !== fileName);
        setOpenTabs(updatedTabs);

        if (activeFileName === fileName) {
            if (updatedTabs.length > 0) {
                setActiveFileName(updatedTabs[updatedTabs.length - 1]);
            } else if (files.length > 0) {
                // If all tabs closed, reopen the first file
                setActiveFileName(files[0].name);
                setOpenTabs([files[0].name]);
            }
        }
    };

    // ----------------------------------------------------
    // 5. File Management: Create, Rename, Delete
    // ----------------------------------------------------
    const openCreateFileDialog = () => {
        setNewFileName("");
        setNewFileError("");
        setShowNewFileModal(true);
    };

    const handleCreateFile = (e) => {
        e.preventDefault();
        const trimmed = newFileName.trim();

        if (!trimmed) {
            setNewFileError("File name cannot be empty.");
            return;
        }

        if (trimmed.includes("/") || trimmed.includes("\\") || trimmed.includes("..")) {
            setNewFileError("File name cannot contain paths or slashes.");
            return;
        }

        if (files.some((f) => f.name.toLowerCase() === trimmed.toLowerCase())) {
            setNewFileError(`A file named "${trimmed}" already exists.`);
            return;
        }

        const langConfig = getFileLanguageConfig(trimmed);
        const newFile = {
            name: trimmed,
            content: langConfig.template || `// ${trimmed}\n`,
            language: langConfig.monaco,
        };

        const updatedFiles = [...files, newFile];
        setFiles(updatedFiles);
        setOpenTabs((prev) => [...prev, trimmed]);
        setActiveFileName(trimmed);

        setUnsavedFiles((prev) => {
            const next = new Set(prev);
            next.add(trimmed);
            return next;
        });
        setSaveStatus("unsaved");

        setShowNewFileModal(false);
    };

    const openRenameDialog = (fileName, e) => {
        e.stopPropagation();
        setRenameTarget(fileName);
        setNewRenameName(fileName);
        setRenameError("");
        setShowRenameModal(true);
    };

    const handleRenameFile = (e) => {
        e.preventDefault();
        const trimmed = newRenameName.trim();

        if (!trimmed) {
            setRenameError("File name cannot be empty.");
            return;
        }

        if (trimmed.includes("/") || trimmed.includes("\\") || trimmed.includes("..")) {
            setRenameError("File name cannot contain slashes or paths.");
            return;
        }

        if (trimmed !== renameTarget && files.some((f) => f.name.toLowerCase() === trimmed.toLowerCase())) {
            setRenameError(`A file named "${trimmed}" already exists.`);
            return;
        }

        const langConfig = getFileLanguageConfig(trimmed);

        // Update in files list
        setFiles((prev) =>
            prev.map((f) =>
                f.name === renameTarget
                    ? { ...f, name: trimmed, language: langConfig.monaco }
                    : f
            )
        );

        // Update in open tabs
        setOpenTabs((prev) =>
            prev.map((t) => (t === renameTarget ? trimmed : t))
        );

        // Update active file
        if (activeFileName === renameTarget) {
            setActiveFileName(trimmed);
        }

        // Update unsaved set
        setUnsavedFiles((prev) => {
            const next = new Set(prev);
            if (next.has(renameTarget)) {
                next.delete(renameTarget);
                next.add(trimmed);
            } else {
                next.add(trimmed);
            }
            return next;
        });
        setSaveStatus("unsaved");

        setShowRenameModal(false);
    };

    const openDeleteDialog = (fileName, e) => {
        e.stopPropagation();
        if (files.length <= 1) {
            alert("A project must contain at least one file. You cannot delete the only remaining file.");
            return;
        }
        setDeleteTarget(fileName);
        setShowDeleteModal(true);
    };

    const handleDeleteFile = () => {
        const remaining = files.filter((f) => f.name !== deleteTarget);
        setFiles(remaining);

        const remainingTabs = openTabs.filter((t) => t !== deleteTarget);
        setOpenTabs(remainingTabs);

        if (activeFileName === deleteTarget) {
            const nextActive = remainingTabs.length > 0 ? remainingTabs[0] : remaining[0]?.name || "";
            setActiveFileName(nextActive);
            if (remainingTabs.length === 0 && nextActive) {
                setOpenTabs([nextActive]);
            }
        }

        setUnsavedFiles((prev) => {
            const next = new Set(prev);
            next.delete(deleteTarget);
            return next;
        });
        setSaveStatus("unsaved");

        setShowDeleteModal(false);
    };

    // ----------------------------------------------------
    // 6. Real Code Execution & HTML/CSS Web Preview
    // ----------------------------------------------------
    const handleRun = async () => {
        if (!activeFile) return;

        const config = getFileLanguageConfig(activeFile.name);

        // A. HTML or CSS: Trigger Web Preview
        if (config.isWebPreview) {
            setActiveBottomTab("preview");
            setPreviewKey((k) => k + 1);
            return;
        }

        // B. Non-executable file (e.g. JSON, Markdown, plain text)
        if (!config.executable) {
            setActiveBottomTab("output");
            setExecutionStatus("idle");
            setOutput(
                `ℹ️ File "${activeFile.name}" (${config.name}) does not support backend execution.\n\nYou can edit and save this file in your project. For execution, select a supported programming file (JavaScript, Python, C, C++, Java, Go, Rust, Ruby, PHP, TypeScript) or preview HTML/CSS.`
            );
            return;
        }

        // C. Executable code via Judge0 backend endpoint
        setActiveBottomTab("output");
        setExecutionStatus("running");
        setOutput(`⚡ Compiling and executing ${activeFile.name}...\n`);
        setExecutionStats(null);
        setProblems([]);

        try {
            const token = localStorage.getItem("codingaddaToken");
            if (!token) {
                router.push("/login");
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/execute`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    sourceCode: activeFile.content,
                    languageId: config.judge0Id,
                    language: config.name,
                    stdin: stdin,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                setExecutionStatus("error");
                setOutput(`❌ Execution Error:\n${data.message || "An error occurred while executing the code."}\n${data.details || ""}`);
                if (data.details || data.message) {
                    setProblems([data.message || "Execution service error."]);
                }
                return;
            }

            // Parse execution output
            let outputText = "";
            const foundProblems = [];

            if (data.compile_output) {
                outputText += `Compilation Output:\n${data.compile_output}\n\n`;
                foundProblems.push(data.compile_output.trim());
            }

            if (data.stderr) {
                outputText += `Standard Error (stderr):\n${data.stderr}\n\n`;
                foundProblems.push(data.stderr.trim());
            }

            if (data.stdout) {
                outputText += data.stdout;
            } else if (!data.compile_output && !data.stderr) {
                outputText += "(Program exited with no output to stdout)";
            }

            setOutput(outputText);
            setProblems(foundProblems);

            const isSuccess = data.status?.id === 3;
            setExecutionStatus(isSuccess ? "success" : "error");

            setExecutionStats({
                status: data.status?.description || "Completed",
                time: data.time ? `${data.time}s` : null,
                memory: data.memory ? `${data.memory} KB` : null,
            });

        } catch (err) {
            console.error("Execution request error:", err);
            setExecutionStatus("error");
            setOutput(
                `❌ Network Error:\nCould not reach the execution API at ${API_BASE_URL || "server"}/api/execute.\nPlease verify that your backend is running.`
            );
        }
    };

    // ----------------------------------------------------
    // 7. Generate Combined HTML + CSS for Sandboxed Preview
    // ----------------------------------------------------
    const buildPreviewHtml = () => {
        // Look for HTML file (prefer active if HTML, otherwise search files)
        const htmlFile = activeFile?.name.endsWith(".html")
            ? activeFile
            : files.find((f) => f.name.endsWith(".html"));

        // Look for CSS file (prefer style.css or active if CSS)
        const cssFile = activeFile?.name.endsWith(".css")
            ? activeFile
            : files.find((f) => f.name.endsWith(".css"));

        // Look for JS file for preview
        const jsFile = files.find((f) => f.name.endsWith(".js") && !f.name.endsWith(".min.js"));

        let html = htmlFile ? htmlFile.content : `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CodingAdda Live Site</title></head><body style="font-family:sans-serif;padding:24px;"><h1>No HTML file selected</h1><p>Select or create an <code>.html</code> file to preview.</p></body></html>`;
        const css = cssFile ? cssFile.content : "";
        const js = jsFile ? jsFile.content : "";

        const styleInjection = css ? `<style>\n${css}\n</style>` : "";
        const scriptInjection = js ? `<script>\ntry {\n${js}\n} catch (err) {\n  console.error("Preview script error:", err);\n}\n</script>` : "";

        if (html.includes("</head>")) {
            html = html.replace("</head>", `${styleInjection}\n</head>`);
        } else if (html.includes("<head>")) {
            html = html.replace("<head>", `<head>\n${styleInjection}`);
        } else {
            html = `${styleInjection}\n${html}`;
        }

        if (html.includes("</body>")) {
            html = html.replace("</body>", `${scriptInjection}\n</body>`);
        } else {
            html = `${html}\n${scriptInjection}`;
        }

        return html;
    };

    // ----------------------------------------------------
    // 8. Open Live Site in Full Browser Tab (Live Server Mode)
    // ----------------------------------------------------
    const handleOpenLiveServer = () => {
        const previewCode = buildPreviewHtml();
        const blob = new Blob([previewCode], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
    };

    // ----------------------------------------------------
    // Render: Loading Screen
    // ----------------------------------------------------
    if (isLoadingProject) {
        return (
            <main className="editor-page editor-centered-state">
                <div className="editor-loading-box">
                    <div className="editor-spinner"></div>
                    <h2>Loading CodingAdda IDE...</h2>
                    <p>Fetching project workspace from database</p>
                </div>
            </main>
        );
    }

    // ----------------------------------------------------
    // Render: Project Error Screen
    // ----------------------------------------------------
    if (projectError) {
        return (
            <main className="editor-page editor-centered-state">
                <div className="editor-error-box">
                    <FiAlertCircle className="error-icon" />
                    <h2>Project Not Found</h2>
                    <p>{projectError}</p>
                    <div className="error-actions">
                        <button className="editor-btn-primary" onClick={() => router.push("/projects")}>
                            <FiArrowLeft /> Go to My Projects
                        </button>
                        <button className="editor-btn-secondary" onClick={fetchProject}>
                            <FiRefreshCw /> Retry
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    // ----------------------------------------------------
    // Render: Full IDE
    // ----------------------------------------------------
    return (
        <main className="editor-page">
            {/* TOP BAR */}
            <header className="editor-topbar">
                <div className="editor-brand">
                    <div className="editor-logo">CA</div>
                    <div>
                        <h2>CodingAdda</h2>
                        <span>Cloud IDE</span>
                    </div>
                </div>

                <div className="editor-project-info">
                    <button
                        className="back-to-projects-btn"
                        onClick={() => router.push("/projects")}
                        title="Back to My Projects"
                    >
                        <FiArrowLeft />
                    </button>
                    <div className="project-title-wrapper">
                        <span className="project-label">PROJECT</span>
                        <strong className="project-name">{projectName}</strong>
                    </div>
                    {project?.language && (
                        <span className="project-badge">{project.language}</span>
                    )}
                </div>

                <div className="editor-actions">
                    {/* Quick Preview & Live Server buttons for HTML/CSS projects */}
                    {(files.some((f) => f.name.endsWith(".html") || f.name.endsWith(".htm")) || activeConfig.isWebPreview) && (
                        <>
                            <button
                                className="editor-action-btn preview-btn"
                                onClick={() => {
                                    setActiveBottomTab("preview");
                                    setPreviewKey((k) => k + 1);
                                }}
                                title="Preview Web Page"
                            >
                                <FiEye /> Preview
                            </button>
                            <button
                                className="editor-action-btn liveserver-btn"
                                onClick={handleOpenLiveServer}
                                title="Open HTML site on Live Server (Full Window)"
                            >
                                <FiExternalLink /> Live Server
                            </button>
                        </>
                    )}

                    {/* Save Button */}
                    <button
                        className={`editor-action-btn save-btn ${saveStatus === "unsaved" ? "has-unsaved" : ""}`}
                        onClick={handleSave}
                        disabled={saveStatus === "saving"}
                    >
                        <FiSave />
                        {saveStatus === "saving"
                            ? "Saving..."
                            : saveStatus === "unsaved"
                            ? "Save *"
                            : "Saved"}
                    </button>

                    {/* Run Button */}
                    <button
                        className={`editor-action-btn run-btn ${executionStatus === "running" ? "is-running" : ""}`}
                        onClick={handleRun}
                        disabled={executionStatus === "running"}
                    >
                        {executionStatus === "running" ? (
                            <>
                                <span className="btn-spinner"></span> Running...
                            </>
                        ) : activeConfig.isWebPreview ? (
                            <>
                                <FiEye /> View Preview
                            </>
                        ) : (
                            <>
                                <FiPlay /> Run
                            </>
                        )}
                    </button>
                </div>
            </header>

            {/* IDE MAIN BODY */}
            <div className="editor-body">
                {/* EXPLORER SIDEBAR */}
                <aside className="editor-sidebar">
                    <div className="sidebar-heading">
                        <span>EXPLORER</span>
                        <button
                            className="sidebar-add-file-btn"
                            onClick={openCreateFileDialog}
                            title="New File"
                        >
                            <FiPlus />
                        </button>
                    </div>

                    <div className="project-folder">
                        <div className="folder-title">
                            <span className="folder-icon">
                                <FiFolder />
                            </span>
                            <span className="folder-name">{projectName.toUpperCase()}</span>
                        </div>

                        <div className="file-list">
                            {files.map((file) => {
                                const cfg = getFileLanguageConfig(file.name);
                                const isSelected = activeFileName === file.name;
                                const isUnsaved = unsavedFiles.has(file.name);

                                return (
                                    <div
                                        key={file.name}
                                        className={`file-item ${isSelected ? "active-file" : ""}`}
                                        onClick={() => handleSelectFile(file.name)}
                                    >
                                        <span className={`file-badge-icon badge-${cfg.colorClass}`}>
                                            {cfg.icon}
                                        </span>

                                        <span className="file-name-text" title={file.name}>
                                            {file.name}
                                        </span>

                                        {isUnsaved && <span className="file-unsaved-dot">●</span>}

                                        <div className="file-item-actions">
                                            <button
                                                className="file-action-btn"
                                                onClick={(e) => openRenameDialog(file.name, e)}
                                                title="Rename File"
                                            >
                                                <FiEdit2 />
                                            </button>
                                            <button
                                                className="file-action-btn file-delete-btn"
                                                onClick={(e) => openDeleteDialog(file.name, e)}
                                                title="Delete File"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </aside>

                {/* MAIN EDITOR & PANELS */}
                <section className="editor-main">
                    {/* FILE TABS */}
                    <div className="editor-tabs">
                        {openTabs.map((fileName) => {
                            const cfg = getFileLanguageConfig(fileName);
                            const isActive = activeFileName === fileName;
                            const isUnsaved = unsavedFiles.has(fileName);

                            return (
                                <div
                                    key={fileName}
                                    className={`editor-tab ${isActive ? "active-tab" : ""}`}
                                    onClick={() => setActiveFileName(fileName)}
                                >
                                    <span className={`tab-icon-badge badge-${cfg.colorClass}`}>
                                        {cfg.icon}
                                    </span>
                                    <span className="tab-label">{fileName}</span>
                                    {isUnsaved ? (
                                        <span className="tab-unsaved-dot">●</span>
                                    ) : null}
                                    <button
                                        className="tab-close-btn"
                                        onClick={(e) => handleCloseTab(fileName, e)}
                                        title="Close Tab"
                                    >
                                        <FiX />
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* MONACO CODE EDITOR */}
                    <div className="code-editor-wrapper">
                        {activeFile ? (
                            <Editor
                                height="100%"
                                language={activeConfig.monaco}
                                value={activeFile.content}
                                theme="vs-dark"
                                onChange={handleCodeChange}
                                onMount={handleEditorDidMount}
                                options={{
                                    fontSize: 14,
                                    fontFamily: 'Consolas, "Fira Code", "Courier New", monospace',
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    tabSize: 4,
                                    wordWrap: "on",
                                    lineNumbers: "on",
                                    bracketPairColorization: { enabled: true },
                                    cursorBlinking: "smooth",
                                    smoothScrolling: true,
                                    padding: { top: 12, bottom: 12 },
                                }}
                            />
                        ) : (
                            <div className="no-file-open">
                                <p>No file selected. Choose or create a file in the sidebar.</p>
                            </div>
                        )}
                    </div>

                    {/* BOTTOM PANEL: OUTPUT / INPUT / WEB PREVIEW / PROBLEMS */}
                    <div className="bottom-panel">
                        <div className="bottom-panel-header">
                            <div className="panel-tabs">
                                <button
                                    className={`panel-tab ${activeBottomTab === "output" ? "active-panel-tab" : ""}`}
                                    onClick={() => setActiveBottomTab("output")}
                                >
                                    <FiTerminal /> OUTPUT
                                    {executionStats && (
                                        <span className={`status-pill ${executionStatus}`}>
                                            {executionStats.status}
                                        </span>
                                    )}
                                </button>

                                <button
                                    className={`panel-tab ${activeBottomTab === "input" ? "active-panel-tab" : ""}`}
                                    onClick={() => setActiveBottomTab("input")}
                                >
                                    STANDARD INPUT (STDIN)
                                </button>

                                <button
                                    className={`panel-tab ${activeBottomTab === "preview" ? "active-panel-tab" : ""}`}
                                    onClick={() => setActiveBottomTab("preview")}
                                >
                                    <FiEye /> WEB PREVIEW
                                </button>

                                <button
                                    className={`panel-tab ${activeBottomTab === "problems" ? "active-panel-tab" : ""}`}
                                    onClick={() => setActiveBottomTab("problems")}
                                >
                                    PROBLEMS
                                    {problems.length > 0 && (
                                        <span className="problems-count">{problems.length}</span>
                                    )}
                                </button>
                            </div>

                            <div className="panel-actions">
                                {activeBottomTab === "output" && (
                                    <>
                                        {executionStats?.time && (
                                            <span className="stat-badge">Time: {executionStats.time}</span>
                                        )}
                                        {executionStats?.memory && (
                                            <span className="stat-badge">Memory: {executionStats.memory}</span>
                                        )}
                                        <button
                                            className="panel-action-btn"
                                            onClick={() => setOutput("")}
                                            title="Clear Output"
                                        >
                                            Clear
                                        </button>
                                    </>
                                )}

                                {activeBottomTab === "preview" && (
                                    <>
                                        <button
                                            className="panel-action-btn"
                                            onClick={handleOpenLiveServer}
                                            title="Open Live Site in Full Browser Tab (Live Server)"
                                        >
                                            <FiExternalLink /> Live Server
                                        </button>
                                        <button
                                            className="panel-action-btn"
                                            onClick={() => setPreviewKey((k) => k + 1)}
                                            title="Reload Preview"
                                        >
                                            <FiRefreshCw /> Reload
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* PANEL CONTENT TABS */}
                        <div className="bottom-panel-body">
                            {/* 1. OUTPUT TAB */}
                            {activeBottomTab === "output" && (
                                <div className="panel-output-content">
                                    {output ? (
                                        <pre className="terminal-output">{output}</pre>
                                    ) : (
                                        <span className="panel-placeholder">
                                            Press "Run" to execute your code. Program output, compiler messages, and errors will appear here.
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* 2. INPUT TAB */}
                            {activeBottomTab === "input" && (
                                <div className="panel-input-content">
                                    <textarea
                                        className="stdin-textarea"
                                        placeholder="Enter standard input (stdin) for programs that read user inputs (e.g. input(), cin, Scanner, readline)..."
                                        value={stdin}
                                        onChange={(e) => setStdin(e.target.value)}
                                        spellCheck="false"
                                    />
                                </div>
                            )}

                            {/* 3. WEB PREVIEW TAB */}
                            {activeBottomTab === "preview" && (
                                <div className="panel-preview-content">
                                    <iframe
                                        key={previewKey}
                                        className="preview-iframe"
                                        srcDoc={buildPreviewHtml()}
                                        title="Sandboxed HTML/CSS Preview"
                                        sandbox="allow-scripts"
                                    />
                                </div>
                            )}

                            {/* 4. PROBLEMS TAB */}
                            {activeBottomTab === "problems" && (
                                <div className="panel-problems-content">
                                    {problems.length > 0 ? (
                                        <ul className="problems-list">
                                            {problems.map((prob, idx) => (
                                                <li key={idx} className="problem-item">
                                                    <FiAlertCircle className="problem-icon" />
                                                    <pre>{prob}</pre>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="no-problems">
                                            <FiCheck className="check-icon" /> No problems or errors reported.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            {/* STATUS BAR */}
            <footer className="editor-statusbar">
                <div className="status-left">
                    <span className={`status-item save-status-${saveStatus}`}>
                        {saveStatus === "saving" && "⏳ Saving..."}
                        {saveStatus === "unsaved" && "● Unsaved changes"}
                        {saveStatus === "saved" && "✓ Saved"}
                        {saveStatus === "failed" && "⚠️ Save failed"}
                    </span>

                    <span className="status-item">
                        Ln {cursorPosition.line}, Col {cursorPosition.col}
                    </span>

                    <span className="status-item">
                        {executionStatus === "running" && "⏳ Running code..."}
                        {executionStatus === "success" && "✓ Execution completed"}
                        {executionStatus === "error" && "✗ Execution error"}
                        {executionStatus === "idle" && "Ready"}
                    </span>
                </div>

                <div className="status-right">
                    <span className="status-item">{activeFileName}</span>
                    <span className="status-item language-tag">{activeConfig.name}</span>
                    <span className="status-item">UTF-8</span>
                    <span className="status-item">Spaces: 4</span>
                </div>
            </footer>

            {/* MODAL: NEW FILE */}
            {showNewFileModal && (
                <div className="modal-overlay">
                    <div className="modal-dialog">
                        <div className="modal-header">
                            <h3>Create New File</h3>
                            <button
                                className="modal-close-btn"
                                onClick={() => setShowNewFileModal(false)}
                            >
                                <FiX />
                            </button>
                        </div>
                        <form onSubmit={handleCreateFile}>
                            <div className="modal-body">
                                <label>File Name (with extension):</label>
                                <input
                                    type="text"
                                    className="modal-input"
                                    placeholder="e.g. script.py, index.html, utils.js"
                                    value={newFileName}
                                    onChange={(e) => setNewFileName(e.target.value)}
                                    autoFocus
                                />
                                {newFileError && (
                                    <p className="modal-error-text">{newFileError}</p>
                                )}
                                <span className="modal-hint">
                                    Supported: .js, .py, .cpp, .c, .java, .html, .css, .ts, .go, .rs, .rb, .php, .json
                                </span>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn-modal-cancel"
                                    onClick={() => setShowNewFileModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn-modal-confirm">
                                    Create File
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: RENAME FILE */}
            {showRenameModal && (
                <div className="modal-overlay">
                    <div className="modal-dialog">
                        <div className="modal-header">
                            <h3>Rename File</h3>
                            <button
                                className="modal-close-btn"
                                onClick={() => setShowRenameModal(false)}
                            >
                                <FiX />
                            </button>
                        </div>
                        <form onSubmit={handleRenameFile}>
                            <div className="modal-body">
                                <label>New Name for "{renameTarget}":</label>
                                <input
                                    type="text"
                                    className="modal-input"
                                    value={newRenameName}
                                    onChange={(e) => setNewRenameName(e.target.value)}
                                    autoFocus
                                />
                                {renameError && (
                                    <p className="modal-error-text">{renameError}</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn-modal-cancel"
                                    onClick={() => setShowRenameModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn-modal-confirm">
                                    Rename
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: DELETE CONFIRMATION */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-dialog">
                        <div className="modal-header">
                            <h3>Delete File</h3>
                            <button
                                className="modal-close-btn"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                <FiX />
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Are you sure you want to permanently delete <strong>{deleteTarget}</strong>?
                            </p>
                            <p className="delete-warning">This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn-modal-cancel"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn-modal-danger"
                                onClick={handleDeleteFile}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default function EditorPage() {
    return (
        <Suspense
            fallback={
                <main className="editor-page editor-centered-state">
                    <div className="editor-loading-box">
                        <div className="editor-spinner"></div>
                        <h2>Loading CodingAdda...</h2>
                    </div>
                </main>
            }
        >
            <EditorComponent />
        </Suspense>
    );
}