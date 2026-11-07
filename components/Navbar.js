"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import "../styles/Navbar.css";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className="navbar">
            <div className="logo">
                <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                    <div className="logo1"></div>
                    <span>Coding Adda</span>
                </a>
            </div>
            
            <div className="hamburger">
                {menuOpen ? (
                    <FaTimes onClick={()=> setMenuOpen(false)} />
                ) : (
                    <FaBars onClick={()=> setMenuOpen(true)} />
                )
                }
            </div>
            <div className={menuOpen ? "menu active" : "menu"}>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/features">Features</a>
                <a href="/learning">Learning</a>
                <a href="/contact">Contact</a>

                <div className="mobile-buttons">
                    <a href="/login" className="login-btn">Login</a>
                    <a href="/signup" className="signup-btn">Sign Up</a>
                </div>
            </div>

            <div className="buttons">
                <a href="/login" className="login-btn"> Login </a>
                <a href="/signup" className="signup-btn"> Sign Up </a>
            </div>
        </nav>
    );
}
