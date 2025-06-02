"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FloatingNavbar from "@/components/hero/FloatingNavbar";
import NebulaHero from "@/components/NebulaHero";
import About from "@/components/hero/About";
import GitHubShowcase from "@/components/hero/GitHubShowcase";
import AutoScrollingTestimonials from "@/components/hero/AutoScrollingTestimonal";
import VisualDiary from "@/components/hero/VisualDiary";
import EventsSection from "@/components/hero/EventsSection";
import TeamPage from "@/components/hero/TeamPage";
import LoginFormPopup from "@/components/LoginFormPopup";
import Footer from "@/components/hero/Footer";
import FullPageWrapper from "@/components/hero/FullPageWrapper";

function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => setIsClient(true), 50);
    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    document.body.style.overflow = showLoginPopup ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoginPopup]);

  if (!isClient) return null;

  return (
    <>
      <FloatingNavbar showLoginState={{ setShowLoginPopup }} />

        <div className="section">
          <NebulaHero />
        </div>
        <div className="section">
          <About />
        </div>
        <div className="section">
          <GitHubShowcase />
        </div>
        <div className="section">
          <AutoScrollingTestimonials />
        </div>
        <div className="section">
          <VisualDiary />
        </div>
        <div className="section">
          <EventsSection />
        </div>
        <div className="section">
          <TeamPage />
          <Footer />
        </div>

      {showLoginPopup && (
        <LoginFormPopup
          onClose={() => setShowLoginPopup(false)}
          onLoginSuccess={(token, email) => {
            setIsLoggedIn(true);
            localStorage.setItem("token", token);
            localStorage.setItem("email", email);
            setShowLoginPopup(false);
            router.push("/leaderboard-contest");
          }}
        />
      )}
    </>
  );
}

export default Page;