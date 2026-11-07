// Centralized mapping of file extensions to editor and execution configurations

export const LANGUAGE_CONFIG = {
  js: {
    name: "JavaScript",
    monaco: "javascript",
    judge0Id: 63,
    executable: true,
    icon: "JS",
    colorClass: "js",
    template: `// JavaScript in CodingAdda\nconsole.log("Hello, CodingAdda!");\n`,
  },
  mjs: {
    name: "JavaScript",
    monaco: "javascript",
    judge0Id: 63,
    executable: true,
    icon: "JS",
    colorClass: "js",
    template: `// JavaScript module in CodingAdda\nconsole.log("Hello, CodingAdda!");\n`,
  },
  jsx: {
    name: "JavaScript (JSX)",
    monaco: "javascript",
    judge0Id: null,
    executable: false,
    icon: "JSX",
    colorClass: "js",
    template: `export default function Component() {\n  return <div>Hello, CodingAdda!</div>;\n}\n`,
  },
  ts: {
    name: "TypeScript",
    monaco: "typescript",
    judge0Id: 74,
    executable: true,
    icon: "TS",
    colorClass: "ts",
    template: `const message: string = "Hello, CodingAdda!";\nconsole.log(message);\n`,
  },
  tsx: {
    name: "TypeScript (TSX)",
    monaco: "typescript",
    judge0Id: null,
    executable: false,
    icon: "TSX",
    colorClass: "ts",
    template: `export default function Component(): JSX.Element {\n  return <div>Hello, CodingAdda!</div>;\n}\n`,
  },
  py: {
    name: "Python",
    monaco: "python",
    judge0Id: 71,
    executable: true,
    icon: "PY",
    colorClass: "py",
    template: `# Python in CodingAdda\nprint("Hello, CodingAdda!")\n`,
  },
  cpp: {
    name: "C++",
    monaco: "cpp",
    judge0Id: 54,
    executable: true,
    icon: "C++",
    colorClass: "cpp",
    template: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, CodingAdda!" << std::endl;\n    return 0;\n}\n`,
  },
  c: {
    name: "C",
    monaco: "c",
    judge0Id: 50,
    executable: true,
    icon: "C",
    colorClass: "c",
    template: `#include <stdio.h>\n\nint main() {\n    printf("Hello, CodingAdda!\\n");\n    return 0;\n}\n`,
  },
  java: {
    name: "Java",
    monaco: "java",
    judge0Id: 62,
    executable: true,
    icon: "JAVA",
    colorClass: "java",
    template: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, CodingAdda!");\n    }\n}\n`,
  },
  html: {
    name: "HTML",
    monaco: "html",
    judge0Id: null,
    executable: false,
    isWebPreview: true,
    icon: "HTML",
    colorClass: "html",
    template: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>CodingAdda</title>\n</head>\n<body>\n  <h1>Hello, CodingAdda!</h1>\n  <p>Start editing to see changes.</p>\n</body>\n</html>\n`,
  },
  css: {
    name: "CSS",
    monaco: "css",
    judge0Id: null,
    executable: false,
    isWebPreview: true,
    icon: "CSS",
    colorClass: "css",
    template: `body {\n  font-family: Arial, sans-serif;\n  background-color: #0b1220;\n  color: #d7e1ee;\n  padding: 20px;\n}\n\nh1 {\n  color: #60a5fa;\n}\n`,
  },
  json: {
    name: "JSON",
    monaco: "json",
    judge0Id: null,
    executable: false,
    icon: "{}",
    colorClass: "json",
    template: `{\n  "name": "CodingAdda",\n  "version": "1.0.0"\n}\n`,
  },
  php: {
    name: "PHP",
    monaco: "php",
    judge0Id: 68,
    executable: true,
    icon: "PHP",
    colorClass: "php",
    template: `<?php\necho "Hello, CodingAdda!\\n";\n`,
  },
  rb: {
    name: "Ruby",
    monaco: "ruby",
    judge0Id: 72,
    executable: true,
    icon: "RB",
    colorClass: "rb",
    template: `puts "Hello, CodingAdda!"\n`,
  },
  go: {
    name: "Go",
    monaco: "go",
    judge0Id: 60,
    executable: true,
    icon: "GO",
    colorClass: "go",
    template: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, CodingAdda!")\n}\n`,
  },
  rs: {
    name: "Rust",
    monaco: "rust",
    judge0Id: 73,
    executable: true,
    icon: "RS",
    colorClass: "rs",
    template: `fn main() {\n    println!("Hello, CodingAdda!");\n}\n`,
  },
};

// Helper to extract file extension from filename
export function getFileExtension(filename) {
  if (!filename) return "";
  const parts = filename.split(".");
  if (parts.length > 1) {
    return parts.pop().toLowerCase();
  }
  return "";
}

// Helper to get configuration for a given filename
export function getFileLanguageConfig(filename) {
  const ext = getFileExtension(filename);
  if (LANGUAGE_CONFIG[ext]) {
    return LANGUAGE_CONFIG[ext];
  }
  return {
    name: "Plain Text",
    monaco: "plaintext",
    judge0Id: null,
    executable: false,
    icon: "TXT",
    colorClass: "txt",
    template: "",
  };
}
