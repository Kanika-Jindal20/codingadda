"use client";

import { useState } from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout.jsx";
import "../forgot-password/forgot-password.css";
import { API_BASE_URL } from "../../lib/config.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setResetLink("");

    if (!email) {
      setError("Please enter your registered email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("Password reset token generated successfully!");
        if (data.resetLink) {
          setResetLink(data.resetLink);
        }
      } else {
        setError(data.message || "Unable to find an account with that email.");
      }
    } catch (err) {
      setError("Failed to reach server. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="forgot-form">
        <h2>Forgot Password 🔑</h2>
        <p className="forgot-subtitle">
          Enter your registered email address and we'll help you reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
            />
          </div>

          {error && <p className="forgot-error-message">{error}</p>}
          {message && <p className="forgot-success-message">{message}</p>}

          {resetLink && (
            <div className="reset-link-box">
              <p>Click below to set your new password:</p>
              <a href={resetLink.replace("http://localhost:3000", "")} className="reset-link-btn">
                Reset Password Now →
              </a>
            </div>
          )}

          <button type="submit" className="forgot-submit-btn" disabled={loading}>
            {loading ? "Generating Link..." : "Send Reset Link"}
          </button>
        </form>

        <div className="forgot-footer">
          <p>
            Remember your password? <a href="/login">Back to Login</a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
