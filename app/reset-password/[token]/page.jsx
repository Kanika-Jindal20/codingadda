"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../../../components/AuthLayout/AuthLayout.jsx";
import "../../forgot-password/forgot-password.css";
import { API_BASE_URL } from "../../../lib/config.js";

export default function ResetPasswordPage({ params }) {
  const unwrappedParams = use(params);
  const token = unwrappedParams.token;
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.message || "Invalid or expired reset token.");
      }
    } catch (err) {
      setError("Failed to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="forgot-form">
        <h2>Set New Password 🔒</h2>
        <p className="forgot-subtitle">
          Please enter and confirm your new secure password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>

          {error && <p className="forgot-error-message">{error}</p>}
          {message && <p className="forgot-success-message">{message}</p>}

          <button type="submit" className="forgot-submit-btn" disabled={loading}>
            {loading ? "Updating Password..." : "Update Password"}
          </button>
        </form>

        <div className="forgot-footer">
          <p>
            <a href="/login">Back to Login</a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
