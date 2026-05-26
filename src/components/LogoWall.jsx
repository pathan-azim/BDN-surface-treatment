import { useRef } from "react";
import SectionHeader from "./SectionHeader";
import { clientLogos } from "../data/siteData";
import "./LogoWall.css";

// Import GSAP core, ScrollTrigger, and the React wrapper hook
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LogoWall() {
  const wallRef = useRef(null);

  useGSAP(() => {
    // 1. Setup a 3D perspective on the parent grid so things can depth-scale beautifully
    gsap.set(".logo-grid-container", { perspective: 1000 });

    // 2. The 3D Entrance Reveal: Logos pop out from a deep 3D space randomly
    gsap.from(".uniform-logo-item", {
      scrollTrigger: {
        trigger: ".logo-grid-container",
        start: "top 85%",
        toggleActions: "play none none none",
      },
      scale: 0,
      z: -500,               // Pulls them from far back in 3D space
      rotationX: () => gsap.utils.random(-60, 60), // Random skew angles for organic flavor
      rotationY: () => gsap.utils.random(-60, 60),
      opacity: 0,
      duration: 1.4,
      stagger: {
        amount: 0.6,         // Total time budget distributed for elements
        from: "random",      // Chaos pattern vs predictable left-to-right waves
      },
      ease: "back.out(1.5)", // Snappy, elastic deceleration
      onComplete: startFloatingIdle // Call the ambient animation once loaded
    });

    // 3. Ambient Idle Routine: Subtle asymmetrical movement so the grid looks alive
    function startFloatingIdle() {
      gsap.utils.toArray(".uniform-logo-item").forEach((logo) => {
        // Create an individual drifting loop for each logo node
        gsap.to(logo, {
          y: "random(-6, 6)",
          x: "random(-4, 4)",
          rotation: "random(-2, 2)",
          duration: "random(2.5, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }

  }, { scope: wallRef });

  // 4. Micro-Interaction: Gravitational pop on mouse hover
  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.12,
      z: 50,                // Pops forward out of the screen layout toward the user
      boxShadow: "0 20px 35px rgba(0,0,0,0.15)",
      borderColor: "#093624", // Accents nicely with your metallic theme green
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",     // Instantly kills the idle drifting tween while hovering
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      z: 0,
      boxShadow: "0 4px 10px rgba(0,0,0,0.0)",
      borderColor: "rgba(0,0,0,0.05)", // Return to baseline stylesheet defaults
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section className="section light logos-section" ref={wallRef}>
      <br />
      <SectionHeader title="TRUSTED BY INDUSTRY LEADERS" badge="PARTNERS" />
      
      <div className="logo-grid-container">
        {clientLogos.map((logo, i) => (
          <div 
            className="uniform-logo-item" 
            key={logo.id || i}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: "preserve-3d" }} // Required for modern depth-rendering
          >
            <img 
              src={logo.imageUrl || logo} 
              alt={logo.name || `Company Logo ${i + 1}`} 
              className="standardized-logo"
            />
          </div>
        ))}
      </div>
    </section>
  );
}