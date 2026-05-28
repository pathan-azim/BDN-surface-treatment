import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./loading.css";

const LoadingScreen = ({ progress = 0 }) => {
  const wrapperRef = useRef(null);
  const percentRef = useRef(null);
  const progressRef = useRef(null);
  const cardRef = useRef(null);

  // 1. Setup Entry Animations (Runs Once on Mount)
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { scale: 0.96, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    gsap.fromTo(
      percentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.3 }
    );

    gsap.fromTo(
      ".loading-subtext",
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.8 }
    );
  }, []);

  // 2. Animate Dynamic Progress Numbers & Bars
  useEffect(() => {
    gsap.to(progressRef.current, {
      width: `${progress}%`,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.to(percentRef.current, {
      scale: 1.04,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });

    /* --- CRITICAL EXIT ENGINE CODE --- 
       Monitor the values. When calculations hit exactly 100%, 
       invoke the cleanup sequence immediately.
    */
    if (progress >= 100) {
      const exitTl = gsap.timeline({ delay: 0.4 }); // Slight delay so the user sees 100%

      exitTl.to(cardRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in"
      })
      .to(wrapperRef.current, {
        yPercent: -100, // Slide the full-screen backdrop overlay smoothly up out of view
        duration: 0.8,
        ease: "power4.inOut"
      }, "-=0.2")
      /* THE FIX: Wipe out layer footprint completely from DOM calculations */
      .set(wrapperRef.current, {
        pointerEvents: "none", // Stops it from acting like an invisible click-shield
        display: "none"        // Destroys it from the active layout pipeline
      });
    }
  }, [progress]);

  return (
    /* Added wrapperRef here so we can target the root background layer */
    <div className="loading-wrapper" ref={wrapperRef}>
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