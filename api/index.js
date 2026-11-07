// Vercel Serverless Function - Express Backend Handler
// All /api/* requests are routed here by vercel.json rewrites

import app from "../server/server.js";

// Vercel expects the default export to be a request handler function
export default app;
