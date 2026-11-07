"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../styles/Learning.css";
import {
  FiBookOpen,
  FiCode,
  FiLayers,
  FiTerminal,
  FiCheckCircle,
  FiArrowRight,
  FiArrowLeft,
  FiSearch,
  FiCompass,
  FiAward,
  FiHelpCircle
} from "react-icons/fi";

export default function Learning({ isDashboardView = false }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
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

  const categories = [
    { id: "all", name: "All Languages", icon: "🌐" },
    { id: "python", name: "Python", icon: "🐍" },
    { id: "javascript", name: "JavaScript", icon: "⚡" },
    { id: "cpp", name: "C / C++", icon: "🔷" },
    { id: "java", name: "Java", icon: "☕" },
    { id: "web", name: "HTML & CSS", icon: "🎨" },
  ];

  const learningModules = [
    // Python Modules
    {
      id: "python-basics",
      category: "python",
      categoryName: "Python",
      level: "Beginner",
      title: "Python Fundamentals & Syntax",
      shortDescription:
        "Understand variables, dynamic typing, primitive data types (integers, floats, strings, booleans), and how to read user input.",
      overview:
        "Python is known for its clean, English-like syntax. You do not need to declare data types explicitly; Python automatically infers types when you assign values to variables.",
      keyConcepts: [
        "Variables do not require explicit type declaration (e.g. x = 10)",
        "Use input() to capture user data as strings",
        "Type casting converts strings to integers with int() or floats with float()",
        "f-strings (formatted strings) make combining text and variables effortless"
      ],
      syntaxNotes:
        "# Variable Assignment\nname = 'Alice'\nage = 20\n\n# User Input and Type Casting\nuser_num = int(input('Enter a number: '))\n\n# Formatted Output\nprint(f'Hello {name}, your number is {user_num}')",
      practiceTask:
        "Write a Python program that asks the user for their name and birth year, calculates their approximate age, and prints a greeting message.",
      starterPracticeCode:
        "# Exercise: Calculate User Age\n# 1. Ask for user's name\n# 2. Ask for user's birth year\n# 3. Calculate current age (assume year is 2026)\n# 4. Print greeting using an f-string\n\n# Write your code below:\n",
      starterFileName: "main.py",
      language: "python"
    },
    {
      id: "python-loops",
      category: "python",
      categoryName: "Python",
      level: "Beginner",
      title: "Control Flow & Loops in Python",
      shortDescription:
        "Master decision making using if/elif/else conditions and automate repetitive tasks using for and while loops.",
      overview:
        "Control flow statements guide which blocks of code execute based on boolean conditions. Loops allow you to iterate through sequences or repeat code until a condition evaluates to false.",
      keyConcepts: [
        "Python uses indentation (4 spaces) instead of curly braces to define blocks",
        "if, elif, and else evaluate conditions in sequential order",
        "range(start, stop, step) generates sequences of integers for 'for' loops",
        "Use 'break' to terminate a loop early, and 'continue' to skip to the next iteration"
      ],
      syntaxNotes:
        "# If-Else Structure\nif score >= 90:\n    print('Grade A')\nelif score >= 75:\n    print('Grade B')\nelse:\n    print('Grade C')\n\n# For Loop with range\nfor i in range(1, 6):\n    print(i)",
      practiceTask:
        "Create a program that loops through numbers from 1 to 20 and prints whether each number is Even or Odd.",
      starterPracticeCode:
        "# Exercise: Even or Odd Checker (1 to 20)\n# Loop from 1 to 20 using range()\n# Use the modulo operator (%) to check if each number is even or odd\n\n# Write your code below:\n",
      starterFileName: "main.py",
      language: "python"
    },
    {
      id: "python-data-structures",
      category: "python",
      categoryName: "Python",
      level: "Intermediate",
      title: "Python Data Collections: Lists & Dicts",
      shortDescription:
        "Learn how to organize, access, modify, and loop through ordered lists and key-value dictionaries.",
      overview:
        "Lists and dictionaries are fundamental collections in Python. Lists preserve order and allow duplicates, while dictionaries map unique keys to values for fast lookups.",
      keyConcepts: [
        "Lists are created with square brackets: fruits = ['apple', 'banana']",
        "Lists are zero-indexed and support slicing: fruits[0], fruits[1:3]",
        "Dictionaries use curly brackets with key-value pairs: student = {'name': 'Sam', 'age': 21}",
        "Use .append(), .remove(), and .get() methods to manipulate collections"
      ],
      syntaxNotes:
        "# List operations\nitems = [10, 20, 30]\nitems.append(40)\n\n# Dictionary operations\nperson = {'name': 'Alex', 'city': 'Delhi'}\nperson['job'] = 'Developer'\nprint(person['name'])",
      practiceTask:
        "Create a list of 5 test scores. Calculate and print the highest score, the lowest score, and the average score.",
      starterPracticeCode:
        "# Exercise: Score Analytics\nscores = [78, 92, 85, 64, 89]\n\n# 1. Find highest score\n# 2. Find lowest score\n# 3. Calculate average score\n# Print the results\n\n# Write your code below:\n",
      starterFileName: "main.py",
      language: "python"
    },

    // JavaScript Modules
    {
      id: "js-basics",
      category: "javascript",
      categoryName: "JavaScript",
      level: "Beginner",
      title: "Modern JavaScript Basics & ES6",
      shortDescription:
        "Master variable declarations with let/const, arrow function syntax, template literals, and fundamental data types.",
      overview:
        "Modern JavaScript (ES6+) introduced cleaner ways to declare variables and functions. Prefer 'const' for values that do not change and 'let' for reassignable variables. Avoid legacy 'var'.",
      keyConcepts: [
        "'const' prevents reassignment; 'let' allows block-scoped reassignment",
        "Arrow functions () => {} provide concise function syntax",
        "Template literals with backticks `` allow embedding expressions using ${var}",
        "Comparison operators: always prefer strict equality (===) over loose equality (==)"
      ],
      syntaxNotes:
        "// Variable Declaration\nconst platform = 'CodingAdda';\nlet activeUsers = 120;\n\n// Arrow Function\nconst greet = (name) => `Welcome to ${platform}, ${name}!`;\nconsole.log(greet('Developer'));",
      practiceTask:
        "Write an arrow function called calculateDiscount that accepts an original price and a discount percentage, returning the final price formatted with a message.",
      starterPracticeCode:
        "// Exercise: calculateDiscount\n// Create an arrow function that calculates the discounted price\n// Test with price = 1000 and discount = 15%\n\nconst calculateDiscount = (price, percentage) => {\n  // Write your code here:\n  \n};\n\n// Test output:\nconsole.log(calculateDiscount(1000, 15));\n",
      starterFileName: "main.js",
      language: "javascript"
    },
    {
      id: "js-dom",
      category: "javascript",
      categoryName: "JavaScript",
      level: "Intermediate",
      title: "DOM Manipulation & Event Listeners",
      shortDescription:
        "Learn how JavaScript interacts with HTML elements, responds to click events, and dynamically updates styles and text.",
      overview:
        "The Document Object Model (DOM) represents your HTML document as a tree of objects. JavaScript can query, modify, add, or delete HTML elements and listen to user events like clicks and key presses.",
      keyConcepts: [
        "document.querySelector('#id') selects elements using CSS selectors",
        "element.textContent and element.innerHTML update element content",
        "element.addEventListener('event', callback) reacts to user actions",
        "element.classList.toggle('active') cleanly controls CSS state"
      ],
      syntaxNotes:
        "const btn = document.querySelector('#submitBtn');\nconst statusText = document.querySelector('#status');\n\nbtn.addEventListener('click', () => {\n  statusText.textContent = 'Action Completed!';\n  statusText.style.color = '#2563ab';\n});",
      practiceTask:
        "Build a simple interactive counter: write the JavaScript logic to increment and decrement a count value when '+' and '-' buttons are clicked.",
      starterPracticeCode:
        "// Exercise: Counter Logic\nlet count = 0;\n\n// Imagine you have elements: #counterValue, #incBtn, #decBtn\nconst updateCounter = (delta) => {\n  // Write your logic here:\n  \n};\n",
      starterFileName: "main.js",
      language: "javascript"
    },
    {
      id: "js-async",
      category: "javascript",
      categoryName: "JavaScript",
      level: "Intermediate",
      title: "Asynchronous JavaScript & Promises",
      shortDescription:
        "Understand asynchronous execution, JavaScript Promises, and modern async/await syntax for non-blocking code.",
      overview:
        "JavaScript runs on a single thread. Asynchronous operations like fetching network data, timers, and database calls run in the background without freezing the user interface.",
      keyConcepts: [
        "Promises represent a future value (Pending, Fulfilled, Rejected)",
        "async functions automatically return a Promise",
        "await pauses function execution until the Promise resolves",
        "Always wrap await calls in try / catch blocks to handle potential network errors"
      ],
      syntaxNotes:
        "async function fetchUserData(userId) {\n  try {\n    const response = await fetch(`https://api.example.com/users/${userId}`);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Error fetching user:', error);\n  }\n}",
      practiceTask:
        "Write an async function simulateTask() that waits 1 second using a Promise-based timeout and then returns 'Task Finished!'.",
      starterPracticeCode:
        "// Exercise: Async Task Simulator\nconst wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\n\nasync function simulateTask() {\n  // 1. Log 'Starting task...'\n  // 2. Await wait(1000)\n  // 3. Return 'Task Finished!'\n}\n\n// Test\nsimulateTask().then(console.log);\n",
      starterFileName: "main.js",
      language: "javascript"
    },

    // C / C++ Modules
    {
      id: "c-basics",
      category: "cpp",
      categoryName: "C / C++",
      level: "Beginner",
      title: "C Language Fundamentals",
      shortDescription:
        "Master the foundation of system programming: variables, standard I/O (printf, scanf), format specifiers, and basic math.",
      overview:
        "C is a compiled, procedural language that gives you low-level access to memory. It forms the backbone of operating systems, game engines, and performance-critical software.",
      keyConcepts: [
        "Every C program starts execution in the main() function",
        "#include <stdio.h> provides access to printf() and scanf()",
        "Format specifiers: %d for integers, %f for floats, %c for characters, %s for strings",
        "All statements must terminate with a semicolon (;)"
      ],
      syntaxNotes:
        "#include <stdio.h>\n\nint main() {\n    int age = 22;\n    float score = 88.5;\n    printf('Age: %d, Score: %.1f\\n', age, score);\n    return 0;\n}",
      practiceTask:
        "Write a C program that prompts the user for the radius of a circle, calculates its area (Area = 3.14159 * r * r), and displays the result with two decimal places.",
      starterPracticeCode:
        "// Exercise: Area of a Circle in C\n#include <stdio.h>\n\nint main() {\n    float radius, area;\n    \n    // Prompt user for radius\n    // Calculate area\n    // Print result\n    \n    return 0;\n}\n",
      starterFileName: "main.c",
      language: "c"
    },
    {
      id: "cpp-oop",
      category: "cpp",
      categoryName: "C / C++",
      level: "Intermediate",
      title: "C++ Object-Oriented Programming",
      shortDescription:
        "Learn classes, object instantiation, public/private access specifiers, constructors, and encapsulation in C++.",
      overview:
        "C++ extends C with Object-Oriented Programming (OOP). Classes allow you to bundle data (attributes) and functions (methods) into reusable blueprints called objects.",
      keyConcepts: [
        "Classes define blueprints; objects are instances of those classes",
        "Access specifiers: 'public' allows external access; 'private' encapsulates internal data",
        "Constructors initialize object properties automatically upon creation",
        "Use std::cout and std::cin from <iostream> for modern C++ I/O"
      ],
      syntaxNotes:
        "#include <iostream>\n#include <string>\n\nclass Student {\npublic:\n    std::string name;\n    int rollNo;\n    \n    Student(std::string n, int r) : name(n), rollNo(r) {}\n    \n    void display() {\n        std::cout << 'Name: ' << name << ', Roll: ' << rollNo << std::endl;\n    }\n};",
      practiceTask:
        "Create a 'Rectangle' class in C++ with private width and height attributes, a constructor, and methods to calculate Area and Perimeter.",
      starterPracticeCode:
        "// Exercise: Rectangle Class in C++\n#include <iostream>\n\nclass Rectangle {\nprivate:\n    int width, height;\npublic:\n    // 1. Add constructor\n    // 2. Add getArea() method\n    // 3. Add getPerimeter() method\n};\n\nint main() {\n    // Create Rectangle and test\n    return 0;\n}\n",
      starterFileName: "main.cpp",
      language: "cpp"
    },

    // Java Modules
    {
      id: "java-basics",
      category: "java",
      categoryName: "Java",
      level: "Beginner",
      title: "Java Fundamentals & Program Structure",
      shortDescription:
        "Understand the Java class structure, the main method signature, primitive types, and reading inputs with Scanner.",
      overview:
        "Java is a statically-typed, object-oriented language that compiles into bytecode executed by the Java Virtual Machine (JVM). In Java, every line of executable code must live inside a class.",
      keyConcepts: [
        "The public class name must match the filename (e.g. Main.java -> public class Main)",
        "The entry point is always: public static void main(String[] args)",
        "Import java.util.Scanner to read input from System.in",
        "Java enforces strict type safety: variables cannot change types once declared"
      ],
      syntaxNotes:
        "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print('Enter name: ');\n        String name = sc.nextLine();\n        System.out.println('Hello, ' + name);\n    }\n}",
      practiceTask:
        "Write a Java program that accepts two integer inputs from the console, calculates their sum and product, and prints the results.",
      starterPracticeCode:
        "// Exercise: Java Sum and Product\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        // Write your solution here:\n        \n    }\n}\n",
      starterFileName: "Main.java",
      language: "java"
    },
    {
      id: "java-collections",
      category: "java",
      categoryName: "Java",
      level: "Intermediate",
      title: "Java Collections: ArrayList & HashMap",
      shortDescription:
        "Master dynamic resizable arrays with ArrayList and high-speed key-value lookups using HashMap in Java.",
      overview:
        "Standard Java arrays have a fixed size. The Java Collections Framework provides dynamic data structures such as ArrayList (growable arrays) and HashMap (key-value associations).",
      keyConcepts: [
        "ArrayList<T> resizes automatically when elements are added or removed",
        "HashMap<K, V> stores key-value pairs with O(1) average lookup time",
        "Use .add(), .get(index), and .size() for ArrayList operations",
        "Use .put(key, value) and .get(key) for HashMap operations"
      ],
      syntaxNotes:
        "import java.util.ArrayList;\nimport java.util.HashMap;\n\nArrayList<String> languages = new ArrayList<>();\nlanguages.add('Java');\nlanguages.add('Python');\n\nHashMap<String, Integer> marks = new HashMap<>();\nmarks.put('Math', 95);\nmarks.put('Science', 90);",
      practiceTask:
        "Create an ArrayList of 4 student names, sort them alphabetically using java.util.Collections.sort(), and print the sorted list.",
      starterPracticeCode:
        "// Exercise: Sort Student Names\nimport java.util.ArrayList;\nimport java.util.Collections;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> students = new ArrayList<>();\n        \n        // 1. Add 4 student names\n        // 2. Sort the ArrayList\n        // 3. Print the sorted list\n        \n    }\n}\n",
      starterFileName: "Main.java",
      language: "java"
    },

    // HTML & CSS Modules
    {
      id: "html-semantic",
      category: "web",
      categoryName: "HTML & CSS",
      level: "Beginner",
      title: "HTML5 Semantic Architecture",
      shortDescription:
        "Learn how to structure accessible, clean websites using semantic tags (header, nav, main, section, footer).",
      overview:
        "HTML (HyperText Markup Language) describes the structure of Web pages. Using semantic HTML tags improves accessibility for screen readers and SEO ranking over generic <div> tags.",
      keyConcepts: [
        "Semantic tags: <header>, <nav>, <main>, <section>, <article>, and <footer>",
        "Forms use <form>, <input>, <label>, and <button> with proper 'type' attributes",
        "Images require meaningful 'alt' text for accessibility",
        "The document starts with <!DOCTYPE html> followed by <html>, <head>, and <body>"
      ],
      syntaxNotes:
        "<!DOCTYPE html>\n<html lang='en'>\n<head>\n  <meta charset='UTF-8'>\n  <title>Semantic Page</title>\n</head>\n<body>\n  <header><h1>CodingAdda</h1></header>\n  <main>\n    <section><h2>Lesson Title</h2><p>Content goes here.</p></section>\n  </main>\n  <footer><p>&copy; 2026 CodingAdda</p></footer>\n</body>\n</html>",
      practiceTask:
        "Build a semantic registration form with labels and inputs for Full Name, Email, Password, and a Submit button.",
      starterPracticeCode:
        "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Registration Form</title>\n</head>\n<body>\n  <!-- Create your semantic registration form here: -->\n  \n</body>\n</html>\n",
      starterFileName: "index.html",
      language: "html"
    },
    {
      id: "css-flexbox",
      category: "web",
      categoryName: "HTML & CSS",
      level: "Beginner",
      title: "CSS3 Flexbox & Modern Alignment",
      shortDescription:
        "Master the Flexbox layout model to align, distribute, and center elements effortlessly on any screen size.",
      overview:
        "CSS Flexible Box Layout (Flexbox) provides a powerful way to arrange elements along a main axis and cross axis. It makes vertical centering and responsive grid layouts straightforward.",
      keyConcepts: [
        "display: flex activates the flex container",
        "justify-content aligns children along the main axis (e.g. center, space-between)",
        "align-items aligns children along the cross axis (e.g. center, stretch)",
        "flex-direction: column or row sets the primary axis"
      ],
      syntaxNotes:
        ".container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 20px;\n}\n\n.card {\n  flex: 1;\n  padding: 20px;\n  border-radius: 12px;\n}",
      practiceTask:
        "Create a 3-item navigation bar with logo on the far left, menu links centered, and a Login button on the far right using display: flex and justify-content: space-between.",
      starterPracticeCode:
        "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    /* Use flexbox to align navbar items */\n    .navbar {\n      display: flex;\n      /* Add justify-content and align-items here: */\n    }\n  </style>\n</head>\n<body>\n  <nav class=\"navbar\">\n    <div class=\"logo\">CodingAdda</div>\n    <div class=\"links\"><a href=\"#\">Home</a> <a href=\"#\">About</a></div>\n    <button class=\"login-btn\">Login</button>\n  </nav>\n</body>\n</html>\n",
      starterFileName: "index.html",
      language: "html"
    },
  ];

  const handleOpenPracticeInEditor = (lesson) => {
    // If user is logged in, create a project with the lesson starter code or navigate to editor
    const token = localStorage.getItem("codingaddaToken");

    if (token) {
      fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: `Lesson: ${lesson.title}`,
          language: lesson.categoryName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.project) {
            const newId = data.project._id;
            fetch(`http://localhost:5000/api/projects/${newId}/files`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                files: [
                  {
                    name: lesson.starterFileName,
                    content: lesson.starterPracticeCode,
                    language: lesson.language,
                  },
                ],
              }),
            }).then(() => {
              router.push(`/editor?id=${newId}`);
            });
          } else {
            router.push("/editor");
          }
        })
        .catch(() => router.push("/editor"));
    } else {
      router.push("/editor");
    }
  };

  const filteredModules = learningModules.filter((module) => {
    const matchesCategory =
      selectedCategory === "all" || module.category === selectedCategory;
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Render Lesson Detail View (Read the module & tutorial first, then practice!)
  if (activeLesson) {
    return (
      <div className="lesson-reader-container">
        <div className="lesson-reader-nav">
          <button className="back-to-topics-btn" onClick={() => setActiveLesson(null)}>
            <FiArrowLeft /> Back to All Topics
          </button>
          <div className="lesson-badges">
            <span className="lang-badge">{activeLesson.categoryName}</span>
            <span className={`level-badge ${activeLesson.level.toLowerCase()}`}>
              {activeLesson.level}
            </span>
          </div>
        </div>

        <div className="lesson-content-card">
          <h1>{activeLesson.title}</h1>
          <p className="lesson-lead">{activeLesson.shortDescription}</p>

          <hr className="lesson-divider" />

          {/* Section 1: Concept & Theory */}
          <div className="lesson-section">
            <h3>📖 1. Concept & Theory</h3>
            <p className="lesson-text">{activeLesson.overview}</p>
          </div>

          {/* Section 2: Key Rules & Objectives */}
          <div className="lesson-section">
            <h3>🎯 2. What You Must Understand</h3>
            <ul className="lesson-bullets">
              {activeLesson.keyConcepts.map((item, idx) => (
                <li key={idx}>
                  <FiCheckCircle className="bullet-icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Syntax Notes */}
          <div className="lesson-section">
            <h3>📝 3. Syntax Reference</h3>
            <div className="syntax-code-box">
              <pre>
                <code>{activeLesson.syntaxNotes}</code>
              </pre>
            </div>
          </div>

          {/* Section 4: Practice Exercise */}
          <div className="lesson-section practice-task-section">
            <h3>💻 4. Practice Task (Try it Yourself!)</h3>
            <div className="task-box">
              <p>{activeLesson.practiceTask}</p>
            </div>

            <div className="lesson-action-bar">
              <button
                className="start-practice-btn"
                onClick={() => handleOpenPracticeInEditor(activeLesson)}
              >
                <FiCode /> Open in Code Editor to Practice →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Main Modules List
  const renderContent = () => (
    <>
      {/* Hero Section */}
      <section className="learning-hero text-center">
        <span className="learning-tag">LEARNING HUB</span>
        <h1>
          Learn to Code, <span>Step by Step</span>
        </h1>
        <p>
          Read core theory and syntax rules first. When you are ready, launch the online code editor to practice hands-on exercises!
        </p>

        {/* Search Bar */}
        <div className="learning-search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search topics (e.g. loops, functions, flexbox, arrays)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery("")}>
              ✕
            </button>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="learning-container">
        {/* Category Filter Tabs */}
        <div className="category-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-tab-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="category-emoji">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Topics Count */}
        <div className="results-count-bar">
          <p>
            Showing <strong>{filteredModules.length}</strong> learning modules
            {selectedCategory !== "all" ? ` in ${categories.find((c) => c.id === selectedCategory)?.name}` : ""}
          </p>
        </div>

        {/* Learning Modules Grid (NO full solution dumped directly!) */}
        <div className="learning-grid">
          {filteredModules.length > 0 ? (
            filteredModules.map((item) => (
              <div className="learning-card" key={item.id}>
                <div className="card-top-badges">
                  <span className="lang-badge">{item.categoryName}</span>
                  <span className={`level-badge ${item.level.toLowerCase()}`}>
                    {item.level}
                  </span>
                </div>

                <h3>{item.title}</h3>
                <p className="card-description">{item.shortDescription}</p>

                <div className="card-topics">
                  <h4>Core Objectives:</h4>
                  <ul>
                    {item.keyConcepts.slice(0, 3).map((concept, idx) => (
                      <li key={idx}>
                        <FiCheckCircle className="topic-icon" />
                        <span>{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-actions">
                  <button
                    className="read-module-btn"
                    onClick={() => setActiveLesson(item)}
                  >
                    <FiBookOpen /> Read Module & Tutorial →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results-card">
              <FiBookOpen className="no-results-icon" />
              <h3>No matching topics found</h3>
              <p>Try searching for a different keyword or reset the category filter.</p>
              <button
                className="reset-filter-btn"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Learning Methodology Section */}
      <section className="learning-methodology">
        <div className="methodology-container">
          <h2>The CodingAdda Learning Path 💡</h2>
          <p className="methodology-sub">
            Read the module and understand the theory first before opening the code editor.
          </p>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <FiCompass className="step-icon" />
              <h3>Read the Module</h3>
              <p>Understand the rules, concepts, and reasons behind each programming construct.</p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <FiCode className="step-icon" />
              <h3>Write the Code Yourself</h3>
              <p>Open the editor with starter tasks and write the logic yourself instead of copying solutions.</p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <FiTerminal className="step-icon" />
              <h3>Run & Test Instantly</h3>
              <p>Execute code in the cloud sandbox and inspect the actual output and error diagnostics.</p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <FiAward className="step-icon" />
              <h3>Solve Challenges</h3>
              <p>Move over to the Challenges tab to apply your knowledge on real algorithmic problems.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  // If viewed from within Dashboard when user is logged in
  if (isDashboardView && user) {
    return (
      <main className="dashboard">
        <nav className="dashboard-navbar">
          <div className="dashboard-site" onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
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
              <button className="sidebar-item" onClick={() => router.push("/dashboard")}>
                🏠 <span>Dashboard</span>
              </button>
              <button className="sidebar-item" onClick={() => router.push("/projects")}>
                📁 <span>My Projects</span>
              </button>
              <button className="sidebar-item" onClick={() => router.push("/editor")}>
                💻 <span>Code Editor</span>
              </button>
              <button className="sidebar-item" onClick={() => router.push("/challenges")}>
                🧩 <span>Challenges</span>
              </button>
              <button className="sidebar-item active" onClick={() => router.push("/learning")}>
                📚 <span>Learning</span>
              </button>
            </div>

            <div className="sidebar-bottom">
              <button className="sidebar-item" onClick={() => router.push("/contact")}>
                💡 <span>Support</span>
              </button>
              <button className="sidebar-item logout" onClick={handleLogout}>
                🚪 <span>Logout</span>
              </button>
            </div>
          </aside>

          <section className="dashboard-content" style={{ padding: "0" }}>
            <div className="learning-page">
              {renderContent()}
            </div>
          </section>
        </div>
      </main>
    );
  }

  // Standalone page
  return <div className="learning-page">{renderContent()}</div>;
}
