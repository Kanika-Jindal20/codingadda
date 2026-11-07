"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar.js";
import Learning from "../../components/Learning.js";
import Footer from "../../components/Footer.js";

export default function LearningPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("codingaddaToken");
    setIsLoggedIn(!!token);
  }, []);

  if (!isMounted) {
    return (
      <main>
        <Navbar />
        <Learning isDashboardView={false} />
        <Footer />
      </main>
    );
  }

  if (isLoggedIn) {
    return <Learning isDashboardView={true} />;
  }

  return (
    <main>
      <Navbar />
      <Learning isDashboardView={false} />
      <Footer />
    </main>
  );
}
