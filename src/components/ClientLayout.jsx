"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FloatingNavbar from "@/components/hero/FloatingNavbar";
import LoginFormPopup from "@/components/LoginFormPopup";

export default function ClientLayout({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        document.body.style.overflow = showLoginPopup ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [showLoginPopup]);

    return (
        <>
            <FloatingNavbar showLoginState={{ setShowLoginPopup }} />
            {children}
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
