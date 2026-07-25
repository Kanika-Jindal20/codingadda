import AuthLayout from "../../components/AuthLayout/AuthLayout";
import "./login.css"

export default function Login(){
    return(
        <AuthLayout>
            <div className="login-form">
                <h2>Welcome Back 👋</h2>
                <p className="login-subtitle">
                    Login to continue your coding journey with CodingAdda
                </p>

                <div className="input-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="Enter your email"/>
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password"/>
                </div>
                <div className="login-options">
                    <label>
                        <input type="checkbox" />
                        Remember Me
                    </label>

                    <a href="#">Forget Password</a>
                </div>

                <button className="login-btn">Login</button>

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