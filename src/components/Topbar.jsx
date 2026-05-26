import { useRef } from "react";
import logo from "../assets/logo.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Topbar() {
  const headerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Initial state: Hide the header off-screen
    // 2. Animate header down, then stagger fade-in the logo, nav links, and CTA button
    tl.from(headerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.out",
    })
    .from(".brand img", {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3") // Starts slightly before the header finish
    .from(".navbtns h4", {
      opacity: 0,
      y: -20,
      duration: 0.6,
      stagger: 0.1, // Delays each link by 0.1s for a wave effect
      ease: "power3.out"
    }, "-=0.2")
    .from(".location button", {
      opacity: 0,
      x: 30,
      duration: 0.5,
      ease: "back.out(1.7)" // Adds a tiny sophisticated bounce
    }, "-=0.3");

  }, { scope: headerRef }); // Scopes animations to this component safely

  return (
    <header className="topbar" ref={headerRef}>
      <div className="brand">
        <img src={logo} alt="Power Coating Logo" />
      </div>
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
  );
}