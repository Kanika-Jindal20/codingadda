import Image from "next/image";
import "../styles/Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo"></div>
            
            <div className="menu">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/features">Features</a>
                <a href="/contact">Contact</a>
            </div>

            <div className="buttons">
                <button className="login-btn">Login</button>
                <button className="signup-btn">Sign Up</button>
            </div>
        </nav>
    )
}