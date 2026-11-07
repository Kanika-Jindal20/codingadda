import app from "../../server/server.js";

// Disable Next.js default body parser and let Express handle request parsing and responses
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req, res) {
  return app(req, res);
}
