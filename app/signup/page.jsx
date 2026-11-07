"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import "./signup.css";
import { API_BASE_URL } from "../../lib/config.js";

export default function Signup() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const[message, setMessage] = useState("");
  const[error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    try{
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if(data.success){
        setMessage(data.message);

        setTimeout(()=>{
          router.push("/login");
        }, 2000);
      }
      else{
        setError(data.message);
      }
    }
    catch(err){
      setMessage("Something went wrong!!");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="signup-form">

        <h2>Create Account 🚀</h2>

        <p className="signup-subtitle">
          Join CodingAdda and start building amazing projects.
        </p>

        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text" name ="name" value={formData.name} onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email" name ="email" value={formData.email} onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password" name ="password" value={formData.password} onChange={handleChange}
            placeholder="Create a password"
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password" name ="confirmPassword" value={formData.confirmPassowrd} onChange={handleChange}
            placeholder="Confirm password"
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <button className="signup-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-btn">
          Continue with Google
        </button>

        <p className="login-link">
          Already have an account?
          <a href="/login"> Login</a>
        </p>

      </div>
    </AuthLayout>
  );
}