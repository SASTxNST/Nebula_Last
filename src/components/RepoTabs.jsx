"use client";

import React, { useEffect, useRef, useState } from "react";
import "../globals.css";

const RepoTabs = ({ repos, selectedRepo, onSelect }) => {
  const tabsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const currentRef = tabsRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={tabsRef}
      className={`flex flex-wrap justify-center gap-4 overflow-x-auto py-4 transition-all duration-600 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {repos.map((repo) => {
        const isActive = selectedRepo.name === repo.name;
        return (
          <button
            key={repo.name}
            onClick={() => onSelect(repo)}
            className={`rounded-full px-6 py-2 font-bold transition-all duration-300 ease-in-out backdrop-blur-sm ${
              isActive
                ? "border-2 border-blue-600 bg-gradient-to-br from-blue-400 to-blue-700 text-white shadow-lg shadow-blue-500/30"
                : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            {repo.name}
          </button>
        );
      })}
    </div>
  );
};

export default RepoTabs;