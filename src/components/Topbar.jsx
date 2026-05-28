import { useRef, useState } from "react";
import logo from "../assets/logo.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Topbar() {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // 1. Initial Page Mount Animation — Runs EXACTLY ONCE on mount
  // Notice the empty dependency array [] inside the wrapper block
  useGSAP(() => {
    const introTl = gsap.timeline();
    
    introTl.from(".topbar", {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.out",
    })
    .from(".brand img", {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3")
    .from(".navbtns h4, .mobile-menu-btn", {
      opacity: 0,
      y: -20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.2")
    .from(".location button", {
      opacity: 0,
      x: 30,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.3");
  }, { dependencies: [], scope: containerRef }); // [] ensures this never runs again when menu updates


  // 2. Mobile Drawer Dynamic Toggle Logic — Runs ONLY when isOpen transitions
  useGSAP(() => {
    if (isOpen) {
      // Open Timeline State Execution
      gsap.timeline()
        .to(".mobile-drawer", {
          opacity: 1,
          pointerEvents: "all",
          duration: 0.3,
          ease: "power2.out"
        })
        /* FIXED: Fade down the desktop header logo/buttons container background 
           so it vanishes completely behind the sand overlay screens on mobile viewports */
        .to(".topbar", {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.2
        }, "<")
        .from(".mobile-nav a", {
          opacity: 0,
          y: 30,
          stagger: 0.08,
          duration: 0.4,
          ease: "power3.out"
        }, "-=0.15");
    } else {
      // Close Timeline State Execution
      gsap.timeline()
        .to(".mobile-drawer", {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.25,
          ease: "power2.in"
        })
        /* FIXED: Bring your clean core desktop header layout back into play smoothly 
           when the overlay closes out */
        .to(".topbar", {
          opacity: 1,
          pointerEvents: "all",
          duration: 0.2
        }, "<");
    }
  }, { dependencies: [isOpen], scope: containerRef }); // Exclusively fires on menu state changes

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div ref={containerRef}>
      <header className="topbar">
        <div className="brand">
          <img src={logo} alt="Power Coating Logo" />
        </div>

        {/* Desktop Links Wrapper */}
        <nav className="navbtns">
          <h4><a href="#work">WORK</a></h4>
          <h4><a href="#services">SERVICES</a></h4>
          <h4><a href="#about">ABOUT</a></h4>
          <h4><a href="#process">PROCESS</a></h4>
          <h4><a href="#contact">CONTACT</a></h4>
        </nav>

        <div className="location">
          <button>Get a quote</button>
        </div>
      </header>

      {/* Hamburger Trigger (Freed outside header to stay fixed on top layer) */}
      <button 
        className={`mobile-menu-btn ${isOpen ? "open" : ""}`} 
        onClick={handleToggle}
        aria-label="Toggle Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu Overlay Layer */}
      <div className="mobile-drawer">
        <div className="mobile-drawer-safe-zone">
          <nav className="mobile-nav">
            <a href="#work" onClick={handleToggle}>WORK</a>
            <a href="#services" onClick={handleToggle}>SERVICES</a>
            <a href="#about" onClick={handleToggle}>ABOUT</a>
            <a href="#process" onClick={handleToggle}>PROCESS</a>
            <a href="#contact" onClick={handleToggle}>CONTACT</a>
          </nav>
        </div>
      </div>
    </div>
  );
}