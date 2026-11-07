"use client";

import "../styles/Features.css";
import {
  FiCode,
  FiFolder,
  FiLayers,
  FiPlay,
  FiEye,
  FiGrid,
  FiSave,
  FiArrowRight,
  FiCheckCircle
} from "react-icons/fi";

export default function Features() {
  const featuresList = [
    {
      icon: <FiCode />,
      title: "Online Code Editor",
      description:
        "Powerful in-browser code editor powered by Monaco (the engine behind VS Code) with syntax highlighting, line numbers, bracket matching, and smooth indentation.",
      highlights: ["No setup required", "Monaco editor experience", "Clean dark editor theme"],
    },
    {
      icon: <FiFolder />,
      title: "Multiple File Management",
      description:
        "Create, rename, switch, and delete multiple files in a single project. Organize modular codebases with custom file extensions just like a local IDE.",
      highlights: ["Add new files instantly", "File tab switching", "Rename & delete files safely"],
    },
    {
      icon: <FiLayers />,
      title: "Multiple Programming Languages",
      description:
        "Write and practice in your favorite language. CodingAdda supports Python, C, C++, Java, JavaScript, TypeScript, HTML, CSS, PHP, Ruby, and Go.",
      highlights: ["Popular beginner languages", "Auto syntax detection", "Language-specific starter templates"],
    },
    {
      icon: <FiPlay />,
      title: "Instant Code Execution",
      description:
        "Compile and execute backend code directly in your browser with standard input (stdin) support and instant terminal output powered by Judge0.",
      highlights: ["Fast cloud compilation", "Interactive stdin support", "Error and compiler diagnostics"],
    },
    {
      icon: <FiEye />,
      title: "Live Web Preview",
      description:
        "Build HTML, CSS, and JavaScript web projects and see the results instantly in a dedicated live preview tab without refreshing your browser.",
      highlights: ["Real-time rendering", "Integrated iframe preview", "Perfect for frontend practice"],
    },
    {
      icon: <FiGrid />,
      title: "Project Management",
      description:
        "Organize all your coding work in dedicated projects. View project statistics, filter by language, search through codebases, and manage your progress.",
      highlights: ["Personal project workspace", "Creation date tracking", "Easy project dashboard"],
    },
    {
      icon: <FiSave />,
      title: "Save & Manage Code",
      description:
        "Never lose your hard work. Your project files and code are securely saved to MongoDB cloud database so you can pick up exactly where you left off.",
      highlights: ["Automatic save state alerts", "Cloud database persistence", "Secure JWT user access"],
    },
  ];

  return (
    <div className="features-page">
      {/* Hero Section */}
      <section className="features-hero text-center">
        <span className="features-tag">PLATFORM CAPABILITIES</span>
        <h1>
          Built for <span>Seamless Coding</span>
        </h1>
        <p>
          CodingAdda provides all the tools you need to write, run, debug, and
          save code directly in your browser without installing heavy software.
        </p>

        <div className="features-hero-buttons">
          <a href="/signup" className="features-primary-btn">
            Get Started Free <FiArrowRight />
          </a>
          <a href="/about" className="features-secondary-btn">
            About CodingAdda
          </a>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="features-container">
        <div className="features-section-header">
          <h2>Core Features</h2>
          <p>Everything you need for learning, practicing, and building software projects.</p>
        </div>

        <div className="features-grid">
          {featuresList.map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon-wrapper">{item.icon}</div>
              <h3>{item.title}</h3>
              <p className="feature-description">{item.description}</p>

              <ul className="feature-highlights">
                {item.highlights.map((highlight, hIndex) => (
                  <li key={hIndex}>
                    <FiCheckCircle className="check-icon" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="features-cta">
        <div className="features-cta-box">
          <h2>Ready to Start Coding? 🚀</h2>
          <p>
            Create your free account today and experience a clean, fast, and
            beginner-friendly coding workspace.
          </p>
          <div className="features-cta-actions">
            <a href="/login" className="cta-login-btn">
              Login to Workspace
            </a>
            <a href="/signup" className="cta-signup-btn">
              Create Free Account
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
