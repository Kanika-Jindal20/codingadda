export const API_BASE_URL =
  typeof window !== "undefined" && window.location.hostname !== "localhost"
    ? (process.env.NEXT_PUBLIC_API_URL || "")
    : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000");
