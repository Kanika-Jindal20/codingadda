import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#0b1220",
      color: "#d7e1ee",
      fontFamily: "sans-serif",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1 style={{ fontSize: "48px", color: "#60a5fa", margin: "0 0 16px 0" }}>404</h1>
      <h2 style={{ fontSize: "20px", margin: "0 0 16px 0" }}>Page Not Found</h2>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>The page you are looking for does not exist.</p>
      <Link href="/" style={{
        background: "#2563ab",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "6px",
        textDecoration: "none",
        fontWeight: "600"
      }}>
        Return Home
      </Link>
    </div>
  );
}
