"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Editor from "@monaco-editor/react";
import "./challenges.css";
import Navbar from "../../components/Navbar.js";
import Footer from "../../components/Footer.js";
import { API_BASE_URL } from "../../lib/config.js";
import {
  FiPlay,
  FiCheckCircle,
  FiXCircle,
  FiFilter,
  FiSearch,
  FiCode,
  FiArrowRight,
  FiArrowLeft,
  FiTerminal,
  FiRefreshCw
} from "react-icons/fi";

export default function ChallengesPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Active challenge state for the solver workspace
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [runOutput, setRunOutput] = useState("");
  const [runStatus, setRunStatus] = useState("idle"); // "idle" | "running" | "success" | "error"

  useEffect(() => {
    setIsMounted(true);
    const savedUser = localStorage.getItem("codingaddaUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("codingaddaUser");
    localStorage.removeItem("codingaddaToken");
    router.push("/login");
  };

  const goToPage = (page) => {
    router.push(page);
  };

  const challenges = [
    {
      id: "two-sum",
      title: "Two Sum",
      difficulty: "Easy",
      category: "Algorithms",
      language: "python",
      languageDisplay: "Python",
      judge0Id: 71, // Python 3
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input has exactly one solution.",
      exampleInput: "nums = [2, 7, 11, 15], target = 9",
      exampleOutput: "[0, 1]",
      explanation: "Because nums[0] + nums[1] == 2 + 7 == 9, we return [0, 1].",
      emptyStarterCode: `# Problem: Two Sum\n# Return indices of two numbers in nums that add up to target\n\ndef two_sum(nums, target):\n    # Write your solution here:\n    pass\n\n# Test with sample input\nresult = two_sum([2, 7, 11, 15], 9)\nprint("Result:", result)\n`,
    },
    {
      id: "palindrome-checker",
      title: "Palindrome Checker",
      difficulty: "Easy",
      category: "Strings",
      language: "javascript",
      languageDisplay: "JavaScript",
      judge0Id: 63, // Node.js
      description:
        "Write a function isPalindrome(str) that returns true if the string reads the same forwards and backwards (ignoring casing and spaces), or false otherwise.",
      exampleInput: '"racecar"',
      exampleOutput: "true",
      explanation: '"racecar" spelled backwards is still "racecar".',
      emptyStarterCode: `// Problem: Palindrome Checker\n// Return true if str reads the same backwards, else false\n\nfunction isPalindrome(str) {\n    // Write your solution here:\n    \n}\n\n// Test with sample input\nconsole.log("Is racecar palindrome?:", isPalindrome("racecar"));\nconsole.log("Is hello palindrome?:", isPalindrome("hello"));\n`,
    },
    {
      id: "fizzbuzz",
      title: "Classic FizzBuzz",
      difficulty: "Easy",
      category: "Logic",
      language: "python",
      languageDisplay: "Python",
      judge0Id: 71,
      description:
        "Print numbers from 1 to N. For multiples of 3, print 'Fizz'. For multiples of 5, print 'Buzz'. For multiples of both 3 and 5, print 'FizzBuzz'. Otherwise print the number.",
      exampleInput: "N = 15",
      exampleOutput: "1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz",
      explanation: "Multiples of 3 print Fizz, multiples of 5 print Buzz, and 15 prints FizzBuzz.",
      emptyStarterCode: `# Problem: FizzBuzz\n# Print 1 to N with Fizz and Buzz rules\n\ndef fizzbuzz(n):\n    # Write your solution here:\n    pass\n\n# Test with N = 15\nfizzbuzz(15)\n`,
    },
    {
      id: "reverse-array",
      title: "Reverse Array In-Place",
      difficulty: "Easy",
      category: "Arrays",
      language: "cpp",
      languageDisplay: "C++",
      judge0Id: 54, // C++
      description:
        "Reverse the elements of an array in-place without allocating a second full array in memory.",
      exampleInput: "[1, 2, 3, 4, 5]",
      exampleOutput: "[5, 4, 3, 2, 1]",
      explanation: "Swap elements from outside towards inside until pointers meet.",
      emptyStarterCode: `// Problem: Reverse Array In-Place in C++\n#include <iostream>\n#include <vector>\n\nvoid reverseArray(std::vector<int>& arr) {\n    // Write your solution here:\n    \n}\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4, 5};\n    reverseArray(nums);\n    std::cout << "Reversed: ";\n    for (int x : nums) std::cout << x << " ";\n    std::cout << std::endl;\n    return 0;\n}\n`,
    },
    {
      id: "valid-parentheses",
      title: "Valid Parentheses",
      difficulty: "Medium",
      category: "Data Structures",
      language: "javascript",
      languageDisplay: "JavaScript",
      judge0Id: 63,
      description:
        "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid (brackets must close in the correct order).",
      exampleInput: '"()[]{}"',
      exampleOutput: "true",
      explanation: "Every opening bracket has a matching closing bracket of the same type.",
      emptyStarterCode: `// Problem: Valid Parentheses\n// Return true if all brackets are properly paired and closed\n\nfunction isValid(s) {\n    // Write your solution here using a stack:\n    \n}\n\n// Test with sample inputs\nconsole.log(isValid("()[]{}")); // Expected: true\nconsole.log(isValid("(]"));     // Expected: false\n`,
    },
    {
      id: "find-missing-number",
      title: "Find Missing Number",
      difficulty: "Easy",
      category: "Arrays",
      language: "java",
      languageDisplay: "Java",
      judge0Id: 62, // Java
      description:
        "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
      exampleInput: "nums = [3, 0, 1]",
      exampleOutput: "2",
      explanation: "n = 3 since there are 3 numbers, so all numbers are in [0, 3]. 2 is the missing number.",
      emptyStarterCode: `// Problem: Find Missing Number in Java\npublic class Main {\n    public static int findMissing(int[] nums) {\n        // Write your solution here:\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] sample = {3, 0, 1};\n        System.out.println("Missing number: " + findMissing(sample));\n    }\n}\n`,
    },
  ];

  // Select a challenge to open in the empty code editor solver
  const handleOpenChallengeSolver = (challenge) => {
    setActiveChallenge(challenge);
    setUserCode(challenge.emptyStarterCode);
    setRunOutput("");
    setRunStatus("idle");
  };

  // Run the user's code for ONLY this selected challenge
  const handleRunSelectedChallenge = async () => {
    if (!activeChallenge) return;

    setIsRunning(true);
    setRunStatus("running");
    setRunOutput(`⚡ Compiling and evaluating your solution for "${activeChallenge.title}"...\n`);

    try {
      const token = localStorage.getItem("codingaddaToken");

      const response = await fetch(`${API_BASE_URL}/api/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          sourceCode: userCode,
          languageId: activeChallenge.judge0Id,
          language: activeChallenge.language,
          stdin: "",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setRunStatus("error");
        setRunOutput(`❌ Execution Error:\n${data.message || "Failed to execute code."}\n${data.details || ""}`);
        return;
      }

      let out = "";
      if (data.compile_output) {
        out += `Compilation Output:\n${data.compile_output}\n\n`;
      }
      if (data.stderr) {
        out += `Error (stderr):\n${data.stderr}\n\n`;
      }
      if (data.stdout) {
        out += `Program Output:\n${data.stdout}\n`;
      } else if (!data.compile_output && !data.stderr) {
        out += "(Program exited with no output to stdout)";
      }

      setRunOutput(out);
      setRunStatus(data.status?.id === 3 ? "success" : "error");

    } catch (err) {
      setRunStatus("error");
      setRunOutput(`❌ Network Error: Could not reach execution API at ${API_BASE_URL || "server"}/api/execute. Make sure your server is running.`);
    } finally {
      setIsRunning(false);
    }
  };

  const filteredChallenges = challenges.filter((c) => {
    const matchDiff = selectedDifficulty === "all" || c.difficulty.toLowerCase() === selectedDifficulty;
    const matchCat = selectedCategory === "all" || c.category.toLowerCase().includes(selectedCategory);
    const matchSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDiff && matchCat && matchSearch;
  });

  // Render the Dedicated Challenge Solver Workspace (Empty Code Editor + Run)
  if (activeChallenge) {
    return (
      <div className="challenge-workspace-page">
        {/* Workspace Top Bar */}
        <header className="workspace-topbar">
          <div className="workspace-top-left">
            <button className="workspace-back-btn" onClick={() => setActiveChallenge(null)}>
              <FiArrowLeft /> Back to Challenges
            </button>
            <span className="workspace-problem-title">{activeChallenge.title}</span>
            <span className={`diff-pill ${activeChallenge.difficulty.toLowerCase()}`}>
              {activeChallenge.difficulty}
            </span>
          </div>

          <div className="workspace-top-right">
            <button
              className="workspace-reset-btn"
              onClick={() => {
                setUserCode(activeChallenge.emptyStarterCode);
                setRunOutput("");
                setRunStatus("idle");
              }}
              title="Reset Code"
            >
              <FiRefreshCw /> Reset Code
            </button>
            <button
              className="workspace-run-btn"
              onClick={handleRunSelectedChallenge}
              disabled={isRunning}
            >
              {isRunning ? "Running..." : (
                <>
                  <FiPlay /> Run Code
                </>
              )}
            </button>
          </div>
        </header>

        {/* Split View: Left Problem Description | Right Monaco Code Editor & Output */}
        <div className="workspace-split-container">
          {/* Left: Problem Details */}
          <section className="workspace-problem-pane">
            <div className="problem-pane-content">
              <h2>{activeChallenge.title}</h2>
              <div className="problem-meta-tags">
                <span className="cat-pill">{activeChallenge.category}</span>
                <span className="lang-pill">{activeChallenge.languageDisplay}</span>
              </div>

              <div className="problem-section">
                <h3>Problem Description</h3>
                <p>{activeChallenge.description}</p>
              </div>

              <div className="problem-section">
                <h3>Example Test Case</h3>
                <div className="example-box">
                  <p><strong>Input:</strong> <code>{activeChallenge.exampleInput}</code></p>
                  <p><strong>Output:</strong> <code>{activeChallenge.exampleOutput}</code></p>
                  {activeChallenge.explanation && (
                    <p className="example-explanation"><strong>Explanation:</strong> {activeChallenge.explanation}</p>
                  )}
                </div>
              </div>

              <div className="problem-section instructions-box">
                <h4>💡 Instructions:</h4>
                <p>
                  Write your logic in the empty code editor on the right. When you click <strong>Run Code</strong>, your code will be sent to the execution engine and evaluated against the test cases!
                </p>
              </div>
            </div>
          </section>

          {/* Right: Monaco Code Editor + Output Panel */}
          <section className="workspace-editor-pane">
            <div className="workspace-monaco-wrapper">
              <div className="editor-file-label">
                <span>Solution ({activeChallenge.languageDisplay})</span>
              </div>
              <Editor
                height="100%"
                language={activeChallenge.language}
                value={userCode}
                theme="vs-dark"
                onChange={(newVal) => setUserCode(newVal || "")}
                options={{
                  fontSize: 14,
                  fontFamily: 'Consolas, "Fira Code", monospace',
                  minimap: { enabled: false },
                  automaticLayout: true,
                  lineNumbers: "on",
                  tabSize: 4,
                  wordWrap: "on",
                }}
              />
            </div>

            {/* Bottom Output Terminal */}
            <div className="workspace-output-terminal">
              <div className="terminal-header">
                <span className="terminal-title">
                  <FiTerminal /> Test Execution Output
                </span>
                {runStatus === "success" && (
                  <span className="terminal-status-success">✓ Executed Successfully</span>
                )}
                {runStatus === "error" && (
                  <span className="terminal-status-error">✗ Execution Error</span>
                )}
              </div>
              <div className="terminal-body">
                {runOutput ? (
                  <pre>{runOutput}</pre>
                ) : (
                  <p className="terminal-placeholder">
                    Click "Run Code" above to execute and test your solution.
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Render Challenges List
  const renderChallengesList = () => (
    <div className="challenges-content-area">
      <div className="challenges-header-row">
        <div>
          <span className="challenges-badge">PRACTICE ARENA</span>
          <h1>Coding Challenges</h1>
          <p>Select any challenge to open an empty code editor and test your logic!</p>
        </div>

        <div className="challenges-search-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search challenges by title or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="challenges-filter-bar">
        <div className="filter-group">
          <span className="filter-label">Difficulty:</span>
          {["all", "easy", "medium", "hard"].map((diff) => (
            <button
              key={diff}
              className={`filter-btn ${selectedDifficulty === diff ? "active" : ""}`}
              onClick={() => setSelectedDifficulty(diff)}
            >
              {diff.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span className="filter-label">Category:</span>
          {["all", "algorithms", "strings", "arrays", "logic"].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges Grid (NO solutions dumped directly!) */}
      <div className="challenges-grid">
        {filteredChallenges.map((item) => (
          <div className="challenge-card" key={item.id}>
            <div className="challenge-card-header">
              <span className={`diff-pill ${item.difficulty.toLowerCase()}`}>
                {item.difficulty}
              </span>
              <span className="cat-pill">{item.category}</span>
              <span className="lang-pill">{item.languageDisplay}</span>
            </div>

            <h3>{item.title}</h3>
            <p className="challenge-desc">{item.description}</p>

            <div className="challenge-examples">
              <div className="example-row">
                <strong>Sample Input:</strong> <code>{item.exampleInput}</code>
              </div>
              <div className="example-row">
                <strong>Expected Output:</strong> <code>{item.exampleOutput}</code>
              </div>
            </div>

            <div className="challenge-card-footer">
              <button
                className="solve-btn"
                onClick={() => handleOpenChallengeSolver(item)}
              >
                <FiCode /> Solve Challenge in Editor →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // If mounting or not logged in, render default layout
  if (!isMounted) {
    return (
      <main style={{ background: "#f7faff", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
          {renderChallengesList()}
        </div>
        <Footer />
      </main>
    );
  }

  // If user is logged in, show inside Dashboard shell!
  if (user) {
    return (
      <main className="dashboard">
        <nav className="dashboard-navbar">
          <div className="dashboard-site" onClick={() => goToPage("/")} style={{ cursor: "pointer" }}>
            <div className="dashboard-logo"></div>
            <span>Coding Adda</span>
          </div>

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

        <div className="dashboard-container">
          <aside className="dashboard-sidebar">
            <div className="sidebar-menu">
              <button className="sidebar-item" onClick={() => goToPage("/dashboard")}>
                🏠 <span>Dashboard</span>
              </button>
              <button className="sidebar-item" onClick={() => goToPage("/projects")}>
                📁 <span>My Projects</span>
              </button>
              <button className="sidebar-item" onClick={() => goToPage("/editor")}>
                💻 <span>Code Editor</span>
              </button>
              <button className="sidebar-item active" onClick={() => goToPage("/challenges")}>
                🧩 <span>Challenges</span>
              </button>
              <button className="sidebar-item" onClick={() => goToPage("/learning")}>
                📚 <span>Learning</span>
              </button>
            </div>

            <div className="sidebar-bottom">
              <button className="sidebar-item" onClick={() => goToPage("/contact")}>
                💡 <span>Support</span>
              </button>
              <button className="sidebar-item logout" onClick={handleLogout}>
                🚪 <span>Logout</span>
              </button>
            </div>
          </aside>

          <section className="dashboard-content">
            {renderChallengesList()}
          </section>
        </div>
      </main>
    );
  }

  // If visitor is NOT logged in, show with public Navbar and Footer!
  return (
    <main style={{ background: "#f7faff", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        {renderChallengesList()}
      </div>
      <Footer />
    </main>
  );
}
