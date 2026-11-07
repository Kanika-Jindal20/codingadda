// Controller for sandboxed code execution using Judge0 CE
// Secures API keys on the server and provides timeout, validation, and error handling

// Standard Judge0 CE language IDs
const LANGUAGE_ID_MAP = {
    javascript: 63,
    js: 63,
    mjs: 63,
    node: 63,
    typescript: 74,
    ts: 74,
    python: 71,
    py: 71,
    c: 50,
    cpp: 54,
    "c++": 54,
    java: 62,
    php: 68,
    ruby: 72,
    rb: 72,
    go: 60,
    rust: 73,
    rs: 73,
};

export const executeCode = async (req, res) => {
    try {
        const { sourceCode, languageId, language, stdin } = req.body;

        if (!sourceCode || typeof sourceCode !== "string") {
            return res.status(400).json({
                success: false,
                message: "Source code is required.",
            });
        }

        // Determine language ID
        let resolvedLanguageId = languageId;
        if (!resolvedLanguageId && language) {
            resolvedLanguageId = LANGUAGE_ID_MAP[language.toLowerCase()];
        }

        if (!resolvedLanguageId) {
            return res.status(400).json({
                success: false,
                message: `Execution is not supported for language: ${language || "unknown"}.`,
            });
        }

        const judge0Url = process.env.JUDGE0_API_URL || "https://ce.judge0.com";
        const judge0Key = process.env.JUDGE0_API_KEY || "";
        const judge0Host = process.env.JUDGE0_API_HOST || "";

        // Build headers
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        if (judge0Key) {
            if (judge0Host || judge0Url.includes("rapidapi.com")) {
                headers["x-rapidapi-key"] = judge0Key;
                headers["x-rapidapi-host"] = judge0Host || "judge0-ce.p.rapidapi.com";
            } else {
                headers["X-Auth-Token"] = judge0Key;
                headers["Authorization"] = `Bearer ${judge0Key}`;
            }
        }

        // Judge0 submission payload with resource limits (5 seconds CPU, 128MB RAM)
        const payload = {
            source_code: sourceCode,
            language_id: resolvedLanguageId,
            stdin: typeof stdin === "string" ? stdin : "",
            cpu_time_limit: 5,
            memory_limit: 128000,
        };

        // Submit to Judge0 with wait=true for synchronous completion
        const submitUrl = `${judge0Url.replace(/\/$/, "")}/submissions?base64_encoded=false&wait=true`;
        
        let judgeResponse;
        try {
            judgeResponse = await fetch(submitUrl, {
                method: "POST",
                headers,
                body: JSON.stringify(payload),
            });
        } catch (fetchErr) {
            console.error("Judge0 network error:", fetchErr);
            return res.status(503).json({
                success: false,
                message: "Could not connect to the code execution service (Judge0). Please check your internet connection and JUDGE0_API_URL in backend configuration.",
                error: fetchErr.message,
            });
        }

        if (!judgeResponse.ok) {
            const errorText = await judgeResponse.text();
            console.error("Judge0 error response:", judgeResponse.status, errorText);

            if (judgeResponse.status === 401 || judgeResponse.status === 403) {
                return res.status(502).json({
                    success: false,
                    message: "Judge0 authentication failed. Please verify JUDGE0_API_KEY in your server .env file.",
                });
            } else if (judgeResponse.status === 429) {
                return res.status(429).json({
                    success: false,
                    message: "Execution rate limit exceeded. Please wait a moment before running again.",
                });
            }

            return res.status(502).json({
                success: false,
                message: `Code execution service returned an error (${judgeResponse.status}).`,
                details: errorText,
            });
        }

        let data = await judgeResponse.json();

        // If the execution is still processing (status 1 = In Queue, 2 = Processing) and token was provided, poll
        if (data.token && (data.status?.id === 1 || data.status?.id === 2 || !data.status)) {
            const token = data.token;
            let attempts = 0;
            const maxAttempts = 10;

            while (attempts < maxAttempts) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                attempts++;

                const pollUrl = `${judge0Url.replace(/\/$/, "")}/submissions/${token}?base64_encoded=false`;
                const pollRes = await fetch(pollUrl, { method: "GET", headers });

                if (pollRes.ok) {
                    data = await pollRes.json();
                    if (data.status && data.status.id > 2) {
                        break; // Completed
                    }
                }
            }
        }

        // Return standard output format
        return res.status(200).json({
            success: true,
            stdout: data.stdout || "",
            stderr: data.stderr || "",
            compile_output: data.compile_output || "",
            message: data.message || "",
            time: data.time || null,
            memory: data.memory || null,
            status: data.status || { id: 3, description: "Completed" },
        });

    } catch (err) {
        console.error("Execute code server error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error during code execution.",
            error: err.message,
        });
    }
};
