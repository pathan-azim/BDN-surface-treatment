// LoadingScreen.jsx

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./loading.css";
const LoadingScreen = ({ progress = 0 }) => {
  const percentRef = useRef(null);
  const progressRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Intro animation
    gsap.fromTo(
      cardRef.current,
      {
        scale: 0.96,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      percentRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        delay: 0.3,
      }
    );

    gsap.fromTo(
      ".loading-subtext",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        delay: 0.8,
      }
    );
  }, []);

  useEffect(() => {
    // Animate progress bar
    gsap.to(progressRef.current, {
      width: `${progress}%`,
      duration: 0.8,
      ease: "power3.out",
    });

    // Animate percentage
    gsap.to(percentRef.current, {
      scale: 1.04,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });
  }, [progress]);

  return (
    <div className="loading-wrapper">
      <div className="loading-card" ref={cardRef}>
        <h1 className="loading-text" ref={percentRef}>
          {progress}%
        </h1>

        <div className="progress-container">
          <div className="progress-bar" ref={progressRef}></div>
        </div>

        <p className="loading-subtext">Processing request...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;