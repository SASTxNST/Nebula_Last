import React, { useEffect, useRef, useState } from "react";

const NebulaHero = () => {
  const dot1Ref = useRef(null);
  const dot2Ref = useRef(null);
  const dot3Ref = useRef(null);
  const dot4Ref = useRef(null);
  const [currentDate, setCurrentDate] = useState('');
  const [spaceQuote, setSpaceQuote] = useState('');

  const openSourceQuotes = [
    "GitHub: Where code meets community and ideas become reality.",
    "Pull requests are love letters to the codebase.",
    "In open source, we don't just write code - we write the future together.",
    "Every commit is a step forward for the entire community.",
    "Fork it, fix it, pull request it - the open source way.",
    "Great software is built by great teams, not lone wolves.",
    "Code collaboration: Where 1 + 1 = infinite possibilities.",
    "Open source: Building tomorrow's technology with today's passion.",
    "Git branching: Where parallel universes of code collide beautifully.",
    "In open source, your next teammate could be anywhere in the world.",
    "Merge conflicts teach us that differences make us stronger.",
    "Contributing to open source: Adding your voice to the global conversation."
  ];

  useEffect(() => {
    // Set current date and random quote
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(dateString);

    const randomQuote = openSourceQuotes[Math.floor(Math.random() * openSourceQuotes.length)];
    setSpaceQuote(randomQuote);

    let animationFrameId;
    let progress1 = 0;
    let progress2 = Math.PI;
    let progress3 = Math.PI / 2;
    let progress4 = (3 * Math.PI) / 2;

    const animate = () => {
      progress1 += 0.01;
      progress2 += 0.01;
      progress3 += 0.01;
      progress4 += 0.01;

      const a1 = window.innerWidth * 0.3;
      const b1 = window.innerWidth * 0.1;
      const angle1 = (-40 * Math.PI) / 180;

      const a2 = a1 * 0.9;
      const b2 = b1 * 1.2;
      const angle2 = (-20 * Math.PI) / 180;

      const setDotPosition = (ref, t, a, b, angle) => {
        const x = a * Math.cos(t);
        const y = b * Math.sin(t);

        const rotatedX = x * Math.cos(angle) - y * Math.sin(angle);
        const rotatedY = x * Math.sin(angle) + y * Math.cos(angle);

        if (ref.current) {
          ref.current.style.transform = `translate(calc(-50% + ${rotatedX}px), calc(-50% + ${rotatedY}px))`;
        }
      };

      setDotPosition(dot1Ref, progress1, a1, b1, angle1);
      setDotPosition(dot2Ref, progress2, a1, b1, angle1);
      setDotPosition(dot3Ref, progress3, a2, b2, angle2);
      setDotPosition(dot4Ref, progress4, a2, b2, angle2);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <>
      <div className="hero-container">
        {/* Live Button */}
        <div className="live-button-container">
          <div className="live-button">
            <div className="live-indicator"></div>
            <span>LIVE</span>
            <div className="dynamic-island">
              <div className="island-content">
                <div className="date-section">
                  <div className="date-label">Today</div>
                  <div className="date-value">{currentDate}</div>
                </div>
                <div className="quote-section">
                  <div className="quote-text">"{spaceQuote}"</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="orbit-container">
          <div className="elliptical-orbit orbit-ring-1" />
          <div className="elliptical-orbit orbit-ring-2" />
          <div ref={dot1Ref} className="orbit-dot" />
          <div ref={dot2Ref} className="orbit-dot" />
          <div ref={dot3Ref} className="orbit-dot" />
          <div ref={dot4Ref} className="orbit-dot" />
        </div>
        <h1 className="nebula-text">NEBULA</h1>
      </div>

      <style jsx>{`
        @import url("https://fonts.cdnfonts.com/css/nebula-hollow");

        .hero-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          background: black url("/BG_.jpg") no-repeat center center;
          background-size: cover;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .live-button-container {
          position: absolute;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
        }

        .live-button {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .live-button::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b, #fb5607, #ff006e);
          background-size: 400% 400%;
          border-radius: 30px;
          opacity: 0;
          z-index: -1;
          animation: gradientShift 3s ease infinite;
          transition: opacity 0.3s ease;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          padding: 2px;
        }

        .live-button:hover::before {
          opacity: 1;
        }

        .live-button::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          z-index: -1;
        }

        .live-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .live-indicator {
          width: 10px;
          height: 10px;
          background: #00ff88;
          border-radius: 50%;
          animation: pulse 2s infinite;
          box-shadow: 0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88;
          }
          50% {
            opacity: 0.7;
            transform: scale(1.3);
            box-shadow: 0 0 15px #00ff88, 0 0 30px #00ff88, 0 0 45px #00ff88;
          }
        }

        .dynamic-island {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 12px;
          width: 380px;
          max-width: 90vw;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 20px;
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(-10px) scale(0.95);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }

        .live-button:hover .dynamic-island {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0) scale(1);
        }

        .island-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .date-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .date-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .date-value {
          color: white;
          font-size: 16px;
          font-weight: 600;
        }

        .quote-section {
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .quote-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          line-height: 1.4;
          font-style: italic;
          text-align: left;
        }

        .orbit-container {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .elliptical-orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px solid rgba(149, 149, 149, 0.5);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        .orbit-ring-1 {
          width: 60vw;
          height: 20vw;
          transform: translate(-50%, -50%) rotate(-40deg);
        }

        .orbit-ring-2 {
          width: 54vw;
          height: 24vw;
          transform: translate(-50%, -50%) rotate(-20deg);
        }

        .orbit-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 12px;
          height: 12px;
          background-color: white;
          border-radius: 50%;
        }

        .nebula-text {
          color: white;
          font-family: "Nebula Hollow", sans-serif;
          letter-spacing: 38px;
          -webkit-text-stroke-width: 1.35px;
          font-size: 8rem;
          z-index: 10;
          text-shadow: 2px 2px 20px rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 768px) {
          .nebula-text {
            font-size: 4rem;
            letter-spacing: 16px;
          }
          
          .live-button-container {
            top: 70px;
            z-index: 1;
          }
          
          .dynamic-island {
            width: 340px;
            padding: 16px;
          }
          
          .live-button {
            padding: 8px 16px;
            font-size: 13px;
          }
          
          .quote-text {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .dynamic-island {
            width: 300px;
            padding: 14px;
          }
          
          .live-button-container {
            top: 60px;
          }
          
          .date-value {
            font-size: 14px;
          }
          
          .quote-text {
            font-size: 11px;
          }
        }

        @media (max-width: 360px) {
          .dynamic-island {
            width: 280px;
            padding: 12px;
          }
          
          .island-content {
            gap: 12px;
          }
          
          .date-value {
            font-size: 13px;
          }
          
          .quote-text {
            font-size: 10px;
            line-height: 1.3;
          }
        }
      `}</style>
    </>
  );
};

export default NebulaHero;