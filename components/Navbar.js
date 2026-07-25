"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import "../styles/Navbar.css";
import "../styles/responsive.css";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className="navbar">
            <div className="logo"></div>
            
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
                <a href="/contact">Contact</a>

                <div className="mobile-buttons">
                    <button className="login-btn">Login</button>
                    <button className="signup-btn">Sign Up</button>
                </div>
            </div>

            <div className="buttons">
                <a href="/login" className="login-btn"> Login </a>
                <a href="/signup" className="signup-btn"> Sign Up </a>
            </div>
        </nav>
    )
}