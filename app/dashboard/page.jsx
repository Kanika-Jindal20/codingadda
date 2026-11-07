"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./dashboard.css";
import { API_BASE_URL } from "../../lib/config.js";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("codingaddaUser");
    const token = localStorage.getItem("codingaddaToken");

    if (!savedUser || !token) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(savedUser));

    // Fetch user's real projects from the backend
    const fetchUserProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok && data.success) {
          setProjects(data.projects || []);
        }
      } catch (err) {
        console.log("Dashboard project fetch error:", err);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchUserProjects();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("codingaddaUser");
    localStorage.removeItem("codingaddaToken");
    router.push("/login");
  };

  const goToPage = (page) => {
    router.push(page);
  };

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.language && p.language.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className="dashboard">
      {/* NAVBAR */}
      <nav className="dashboard-navbar">
        {/* LOGO */}
        <div className="dashboard-site" onClick={() => goToPage("/")} style={{ cursor: "pointer" }}>
          <div className="dashboard-logo"></div>
          <span>Coding Adda</span>
        </div>

        {/* SEARCH */}
        <div className="dashboard-search">
          <input
            type="text"
            placeholder="Search projects by name or language..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-right">
          <button className="notification-btn" title="Notifications">🔔</button>

          <div className="user-profile">
            <div className="profile-avatar"></div>
            <div className="profile-info">
              <span className="profile-name">{user?.name || "Developer"}</span>
              <span className="profile-role">{user?.email || ""}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN AREA */}
      <div className="dashboard-container">
        {/* SIDEBAR */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-menu">
            <button className="sidebar-item active" onClick={() => goToPage("/dashboard")}>
              🏠
              <span>Dashboard</span>
            </button>

            <button className="sidebar-item" onClick={() => goToPage("/projects")}>
              📁
              <span>My Projects</span>
            </button>

            <button className="sidebar-item" onClick={() => goToPage("/editor")}>
              💻
              <span>Code Editor</span>
            </button>

            <button className="sidebar-item" onClick={() => goToPage("/challenges")}>
              🧩
              <span>Challenges</span>
            </button>

            <button className="sidebar-item" onClick={() => goToPage("/learning")}>
              📚
              <span>Learning</span>
            </button>
          </div>

          <div className="sidebar-bottom">
            <button className="sidebar-item" onClick={() => goToPage("/contact")}>
              💡
              <span>Support</span>
            </button>

            <button className="sidebar-item logout" onClick={handleLogout}>
              🚪
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* CONTENT */}
        <section className="dashboard-content">
          {/* WELCOME */}
          <div className="welcome-section">
            <div>
              <p className="welcome-small"> Welcome back 👋 </p>
              <h1> Hello, {user?.name || "Developer"}! </h1>
              <p className="welcome-text"> Ready to build something amazing today? </p>
            </div>

            <button className="new-project-btn" onClick={() => goToPage("/projects")}>
              + New Project
            </button>
          </div>

          {/* STATS */}
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon">📁</div>
              <div>
                <p>Total Projects</p>
                <h2>{projects.length}</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💻</div>
              <div>
                <p>Coding Adda Editor</p>
                <h2>Active</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🧩</div>
              <div>
                <p>Supported Languages</p>
                <h2>10+</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div>
                <p>Learning Topics</p>
                <h2>12 Topics</h2>
              </div>
            </div>
          </div>

          {/* RECENT PROJECTS */}
          <div className="section-header">
            <h2>Recent Projects</h2>
            <button className="view-all" onClick={() => goToPage("/projects")}>
              View All →
            </button>
          </div>

          <div className="projects-container">
            {loadingProjects ? (
              <p style={{ color: "#94a3b8" }}>Loading your projects...</p>
            ) : filteredProjects.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "18px",
                  width: "100%",
                  padding: "24px",
                }}
              >
                {filteredProjects.slice(0, 6).map((project) => (
                  <div
                    key={project._id}
                    style={{
                      background: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "10px",
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: "#60a5fa", background: "#1e3a8a", padding: "3px 10px", borderRadius: "6px" }}>
                          {project.language || "General"}
                        </span>
                        <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 style={{ margin: 0, fontSize: "17px", color: "white" }}>
                        {project.name}
                      </h4>
                    </div>

                    <button
                      onClick={() => goToPage(`/editor?id=${project._id}`)}
                      style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "7px",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Open in Editor →
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-projects">
                <div className="empty-icon"> 📂</div>
                <h3> No projects yet </h3>
                <p> Start your first project and bring your ideas to life. </p>
                <button className="create-project-btn" onClick={() => goToPage("/projects")}>
                  + Create Your First Project
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
