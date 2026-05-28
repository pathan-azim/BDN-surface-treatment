import { useRef, useState } from "react";
import logo from "../assets/logo.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Topbar() {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // Use a single useGSAP hook scoped to the master container to handle all lifecycle states cleanly
  useGSAP(() => {
    // 1. Run Initial On-Mount Entrance Animations
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

    // 2. Setup the Interaction Animation Logic for the Mobile Drawer
    if (isOpen) {
      // Open state transition sequence
      gsap.timeline()
        .to(".mobile-drawer", {
          opacity: 1,
          pointerEvents: "all",
          duration: 0.3,
          ease: "power2.out"
        })
        .from(".mobile-nav a", {
          opacity: 0,
          y: 30,
          stagger: 0.08,
          duration: 0.4,
          ease: "power3.out"
        }, "-=0.15");
    } else {
      // Close state transition sequence
      gsap.to(".mobile-drawer", {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.25,
        ease: "power2.in"
      });
    }

  }, { dependencies: [isOpen], scope: containerRef });

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
      </header> {/* <--- CLOSING HEADER HERE */}

      {/* CRITICAL MOVE: The Hamburger Trigger is pulled OUT of the header.
         Now it can float independently in screen-space with zero parent overflow clipping!
      */}
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
        <nav className="mobile-nav">
          <a href="#work" onClick={handleToggle}>WORK</a>
          <a href="#services" onClick={handleToggle}>SERVICES</a>
          <a href="#about" onClick={handleToggle}>ABOUT</a>
          <a href="#process" onClick={handleToggle}>PROCESS</a>
          <a href="#contact" onClick={handleToggle}>CONTACT</a>
        </nav>
      </div>
    </div>

  );
}