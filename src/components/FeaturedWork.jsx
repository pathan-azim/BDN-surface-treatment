import { useRef } from "react";
import SectionHeader from "./SectionHeader";
import { featuredWorks } from "../data/sitedata";
import "./FeaturedWork.css";

// Import GSAP core, ScrollTrigger, and the React hook
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function FeaturedWork() {
  const containerRef = useRef(null);

  const cardLayoutStyles = [
    "bento-top-left",     // 0: Large square
    "bento-top-right",    // 1: Medium square
    "bento-bottom-left",  // 2: Small dark block
    "bento-bottom-mid",   // 3: Small wide image
    "bento-bottom-right"  // 4: Tall vertical block
  ];

  useGSAP(() => {
    // Reveal Entrance Timeline triggered on Scroll
    gsap.from(".bento-item", {
      scrollTrigger: {
        trigger: ".bento-container",
        start: "top 80%", // Starts when the top of the container hits 80% of the viewport height
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.15, // Creates a wave-like layout reveal effect card-by-card
      ease: "power3.out",
    });
  }, { scope: containerRef });

  // GSAP Hover Handlers for smooth micro-interactions
  const handleMouseEnter = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector(".bento-bg img");
    const btnIcon = card.querySelector(".bento-btn svg");

    // Smoothly scale image inward
    if (img) {
      gsap.to(img, { scale: 1.06, duration: 0.4, ease: "power2.out" });
    }
    // Shift the arrow slightly forward
    if (btnIcon) {
      gsap.to(btnIcon, { x: 4, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector(".bento-bg img");
    const btnIcon = card.querySelector(".bento-btn svg");

    if (img) {
      gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" });
    }
    if (btnIcon) {
      gsap.to(btnIcon, { x: 0, duration: 0.3, ease: "power2.out" });
    }
  };

  return (
    <section id="work" className="section light" ref={containerRef}>
      <SectionHeader title="FULL FEATURED WORK" badge="Portfolio" />
      
      <div className="bento-container">
        {featuredWorks.slice(0, 5).map((item, i) => {
          const layoutClass = cardLayoutStyles[i] || "";

          return (
            <article 
              className={`bento-item ${layoutClass}`} 
              key={i}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Render background images for cards that use them */}
              {item.imageUrl && (
                <div className="bento-bg" style={{ overflow: "hidden" }}>
                  <img src={item.imageUrl} alt={item.title} style={{ transition: "none" }} />
                </div>
              )}
              
              {/* Card Meta Content Block */}
              <div className="bento-content">
                <div className="bento-text">
                  <h3>{item.title}</h3>
                  {item.subtitle && <p>{item.subtitle}</p>}
                </div>
                
                {/* Modern Pill Button from the layout */}
                {/* <button className="bento-btn" aria-label="Details">
                  <span>Подробнее</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button> */}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}