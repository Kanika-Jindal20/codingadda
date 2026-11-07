"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import "./login.css";
import { API_BASE_URL } from "../../lib/config.js";

export default function Login(){
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        setError("");
        setMessage("");
        
        try{
            setLoading(true);

            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("codingaddaUser", JSON.stringify(data.user));
                localStorage.setItem("codingaddaToken", data.token);
                
                setMessage(data.message);
                // Login successful
                router.push("/dashboard");
            } else {
                // Login failed
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

    return(
        <AuthLayout>
            <div className="login-form">
                <h2>Welcome Back 👋</h2>
                <p className="login-subtitle">
                    Login to continue your coding journey with CodingAdda
                </p>

                <div className="input-group">
                    <label>Email Address</label>
                    <input type="email" name ="email" value={formData.email} onChange={handleChange}
                    placeholder="Enter your email"/>
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" name ="password" value={formData.password} onChange={handleChange}
                    placeholder="Enter your password"/>
                </div>
                <div className="login-options">
                    <label>
                        <input type="checkbox" />
                        Remember Me
                    </label>

                    <a href="/forgot-password">Forgot Password?</a>
                </div>

                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}

                <button className="login-btn" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Generating your dashboard..." : "Login"}
                </button>

                <div className="divider">
                    <span>OR</span>
                </div>

                <button className="google-btn">Continue with Google</button>

                <p className="signup-link">
                    Don't have an account? <a href = "/signup">Sign Up</a>
                </p>
            </div>
        </AuthLayout>
    )
}