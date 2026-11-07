"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../../lib/config.js";
import "./projects.css";

export default function Projects() {

    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [language, setLanguage] = useState("JavaScript");
    const [editingProject, setEditingProject] = useState(null);
    const [editProjectName, setEditProjectName] = useState("");
    const [editLanguage, setEditLanguage] = useState("JavaScript");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchProjects = async () => {
        try {
            const token = localStorage.getItem("codingaddaToken");
            
            if (!token) {
                router.push("/login");
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/projects`,{
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                setError(data.message || "Failed to load projects.");
                return;
            }

            const formattedProjects = data.projects.map((project) => ({
                id: project._id,
                name: project.name,
                language: project.language,
                modified: new Date(project.createdAt).toLocaleDateString(),
            }));

            setProjects(formattedProjects);

        } catch (err) {
            console.log("Fetch projects error:", err);
            setError("Something went wrong while loading projects.");
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreateProject = async (e) => {
        e.preventDefault();

        if (!projectName.trim()) {
            return;
        }

        setError("");
        setLoading(true);

        try {
            const token = localStorage.getItem("codingaddaToken");
            if (!token) {
                router.push("/login");
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/projects`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: projectName,
                        language: language,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                setError(data.message || "Failed to create project.");
                return;
            }

            const newProject = {
                id: data.project._id,
                name: data.project.name,
                language: data.project.language,
                modified: "Just now",
            };

            setProjects((prevProjects) => [
                newProject,
                ...prevProjects,
            ]);

            setProjectName("");
            setLanguage("JavaScript");
            setShowForm(false);

        } catch (err) {
            console.log("Create project error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProject = async (id) => {
        try {
            const token = localStorage.getItem("codingaddaToken");

            if (!token) {
                router.push("/login");
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/projects/${id}`,{
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                setError(data.message || "Failed to delete project.");
                return;
            }

            setProjects((prevProjects) =>
                prevProjects.filter((project) => project.id !== id)
            );

        } catch (err) {
            console.log("Delete project error:", err);
            setError("Something went wrong while deleting the project.");
        }
    };

    const handleUpdateProject = async (e) => {
        e.preventDefault();

        if (!editProjectName.trim()) {
            return;
        }

        try {
            const token = localStorage.getItem("codingaddaToken");

            if (!token) {
                router.push("/login");
                return;
            }

            const response = await fetch(
                `${API_BASE_URL}/api/projects/${editingProject.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: editProjectName,
                        language: editLanguage,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                setError(data.message || "Failed to update project.");
                return;
            }

            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project.id === editingProject.id
                        ? {
                              ...project,
                              name: data.project.name,
                              language: data.project.language,
                          }
                        : project
                )
            );

            setEditingProject(null);
            setEditProjectName("");
            setEditLanguage("JavaScript");

        } catch (err) {
            console.log("Update project error:", err);
            setError("Something went wrong while updating the project.");
        }
    };

    return (
        <main className="projects-page">

            {/* HEADER */}
            <div className="projects-header">
                <div>
                    <button
                        onClick={() => router.push("/dashboard")}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#60a5fa",
                            cursor: "pointer",
                            fontSize: "14px",
                            padding: "0 0 8px 0",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontWeight: "600"
                        }}
                    >
                        ← Back to Dashboard
                    </button>
                    <h1> My Projects </h1>
                    <p className="projects-subtitle"> Create and manage your coding projects. </p>
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <button
                        onClick={() => router.push("/editor")}
                        style={{
                            background: "transparent",
                            color: "#94a3b8",
                            border: "1px solid #334155",
                            padding: "10px 18px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "600"
                        }}
                    >
                        💻 Launch IDE
                    </button>
                    <button className="create-project-btn" onClick={() => setShowForm(!showForm)}> + New Project </button>
                </div>
            </div>

            {/* CREATE PROJECT FORM */}
            {showForm && (
                <div className="project-form-card">
                    <h2> Create New Project </h2>
                    <form onSubmit={handleCreateProject}>
                        <div className="form-group">
                            <label> Project Name </label>
                            <input type="text" placeholder="Enter project name" value={projectName}
                             onChange={(e) => setProjectName(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label> Programming Language </label>
                            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                                <option>JavaScript</option>
                                <option>HTML</option>
                                <option>CSS</option>
                                <option>C++</option>
                                <option>Python</option>
                                <option>Java</option>
                                <option>C</option>
                                <option>Ruby</option>
                            </select>
                        </div>

                        {error && ( <p className="error-message"> {error} </p> )}

                        <div className="form-actions">
                            <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}> Cancel </button>
                            <button type="submit" className="save-project-btn" disabled={loading}>
                                {loading ? "Creating..." : "Create Project"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {editingProject && (<div className="project-form-card">
                <h2> Edit Project </h2>
                <form onSubmit={handleUpdateProject}>
                    <div className="form-group">
                        <label> Project Name </label>
                        <input type="text" placeholder="Enter project name" value={editProjectName}
                         onChange={(e) => setEditProjectName(e.target.value)}/>
                    </div>
                    
                    <div className="form-group">
                        <label> Programming Language </label>
                        <select value={editLanguage}
                         onChange={(e) => setEditLanguage(e.target.value)}>
                            <option>JavaScript</option>
                            <option>HTML</option>
                            <option>CSS</option>
                            <option>C++</option>
                            <option>Python</option>
                            <option>Java</option>
                        </select>
                     </div>
                    <div className="form-actions">
                        <button type="button" className="cancel-btn"
                        onClick={() => setEditingProject(null)}> 
                            Cancel
                        </button>
                        <button type="submit" className="save-project-btn">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
            )}

            {/* PROJECTS */}
            {projects.length === 0 ? (
                <div className="projects-empty">
                    <div className="projects-empty-icon"> 📂 </div>
                    <h2> No Projects Yet </h2>
                    <p> Create your first project and start coding. </p>
                    <button className="empty-create-btn" onClick={() => setShowForm(true)}>
                        + Create Your First Project
                    </button>
                </div>
            ) : (
                <div className="project-grid">
                    {projects.map((project) => (
                        <div className="project-card" key={project.id}>
                            <div className="project-card-top">
                                <div className="project-icon"> 💻 </div>
                                <div>
                                    <button className="edit-project-btn"
                                 onClick={() => { setEditingProject(project); setEditProjectName(project.name); setEditLanguage(project.language);}}>
                                    ✏️
                                </button>
                                <button className="delete-project-btn" onClick={() => handleDeleteProject(project.id)}>
                                    🗑️
                                </button>
                                </div>
                            </div>

                            <h3> {project.name} </h3>
                            <p className="project-language"> {project.language} </p>
                            <p className="project-modified">  Modified {project.modified} </p>
                            <button className="open-project-btn" onClick={() => router.push(`/editor?id=${project.id}`)}>
                                Open Project →
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
