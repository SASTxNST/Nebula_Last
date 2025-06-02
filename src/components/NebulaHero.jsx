import React, { useEffect, useRef } from "react";

const NebulaHero = () => {
  const dot1Ref = useRef(null);
  const dot2Ref = useRef(null);
  const dot3Ref = useRef(null);
  const dot4Ref = useRef(null);

  useEffect(() => {
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

      const setDotPosition = (
        ref,
        t,
        a,
        b,
        angle
      ) => {
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
        }
      `}</style>
    </>
  );
};

export default NebulaHero;
