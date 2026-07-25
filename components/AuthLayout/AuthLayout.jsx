"use client";

import "./AuthLayout.css"
export default function AuthLayout({children}){
    return(
        <div className="auth-page">
            <div className="auth-left"></div>
            <div className="auth-right">
                {children}
            </div>
        </div>
    )
}