import AuthLayout from "../../components/AuthLayout/AuthLayout";
import "./signup.css";

export default function Signup() {
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
            type="text"
            placeholder="Enter your full name"
          />
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
          />
        </div>

        <button className="signup-btn">
          Create Account
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