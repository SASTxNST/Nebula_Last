"use client";

import React, { useState } from "react";

const IdeaForm = () => {
  const [idea, setIdea] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "be343a82-8d0a-4bc4-a482-63142b6f84d4",
          subject: "New Idea Submission",
          email,
          idea,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("✅ Sent successfully!");
        setIdea("");
        setEmail("");
      } else {
        setStatus(`❌ Failed to send: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting idea:", error);
      setStatus("❌ Failed to send due to network or server error.");
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
        >
          <h2 className="text-center font-orbitron text-2xl font-bold text-cyan-400">
            💡 Submit Your Idea
          </h2>

          <textarea
            placeholder="What's your idea?"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            required
            rows={5}
            className="focus:ring-cyan-500 rounded-lg border border-white/20 bg-black/60 p-4 placeholder-gray-400 focus:outline-none focus:ring-2 resize-none text-white"
          />

          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="focus:ring-cyan-500 rounded-lg border border-white/20 bg-black/60 p-4 placeholder-gray-400 focus:outline-none focus:ring-2 text-white"
          />

          <button
            type="submit"
            className="rounded-lg bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-600"
          >
            🚀 Submit Idea
          </button>

          {status && (
            <p className="animate-pulse text-center text-sm text-white/80">
              {status}
            </p>
          )}
        </form>
      </main>
    </div>
  );
};

export default IdeaForm;