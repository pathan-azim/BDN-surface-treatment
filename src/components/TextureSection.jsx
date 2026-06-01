import { useState, useRef } from "react";
import "./TextureSection.css";

// Import GSAP, ScrollTrigger, and SplitType
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import SectionHeader from "./SectionHeader";
import glossy from "../assets/glossy.png";
gsap.registerPlugin(ScrollTrigger);

export default function TextureSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);

  // Content matrix modeling our 4 design quadrants
  const textureData = [
    {
      title: "HIGH-GLOSS FINISHES",
      type: "gloss"
    },
    {
      title: "TEXTURIZED COATINGS",
      type: "texture"
    },
    {
      title: "ANTI-CORROSION LAYERS",
      type: "shield"
    },
    {
      title: "CUSTOM COLOR MATCHING",
      type: "swatch"
    }
  ];

  useGSAP(() => {
    // 1. Target both top and bottom mirrored headers across cards
    const targets = gsap.utils.toArray(".texture-head-text, .texture-foot-text");

    // 2. Fragment typography into controlled character nodes
    const splitInstances = targets.map((target) => {
      return new SplitType(target, { types: "chars", charClass: "ts-gsap-char" });
    });

    // 3. Coordinate cinematic entry wavefront transition
    gsap.from(".ts-gsap-char", {
      scrollTrigger: {
        trigger: ".texture-section-grid",
        start: "top 75%", 
        toggleActions: "play none none none",
      },
      yPercent: 110,       
      opacity: 0,
      duration: 0.9,
      stagger: 0.015,       
      ease: "power4.out",  
    });

    return () => {
      splitInstances.forEach((instance) => instance.revert());
    };
  }, { scope: containerRef });

  return (
    <section id="texture-section" className="section dark" ref={containerRef}>
      <SectionHeader title="TEXTURE & FINISHES" />
      <div className="texture-section-wrapper" ref={containerRef}>
        
      <div 
        className="texture-section-grid"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {textureData.map((item, i) => {
          const isActive = hoveredIndex === i;

          return (
            <div 
              key={i}
              className={`texture-section-card ${isActive ? "card-is-hovered" : ""}`}
              onMouseEnter={() => setHoveredIndex(i)}
            >
              {/* Symmetrical Top Title Header (Masked for GSAP split reveal) */}
              <div className="text-overflow-mask">
                <div className="texture-head-text">{item.title}</div>
              </div>

              {/* Enhanced Central Display Area */}
              <div className="card-visual-center">
                
                {/* Quadrant 1 Content */}
                {item.type === "gloss" && (
                  <div className="gloss-cap-container">
                    <img 
                      src={glossy} 
                      alt="High Gloss Cap" 
                      className="gloss-cap-image" 
                    />
                  </div>
                )}

                {/* Quadrant 2 Content */}
                {item.type === "texture" && (
                  <div className="texturized-coating-surface"></div>
                )}

                {/* Quadrant 3 Content */}
                {item.type === "shield" && (
                  <div className="heraldic-shield-container">
                    <svg className="heraldic-shield-svg" viewBox="0 0 100 100" fill="none" xmlns="http://w3.org">
                      <path d="M50 15 L20 25 V55 C20 75 50 88 50 88 Z" fill="#000000" />
                      <path d="M50 15 V88 C50 88 80 75 80 55 V25 L50 15 Z" fill="#ffffff" />
                      <path d="M50 15 L20 25 V55 C20 75 50 88 50 88 Z" fill="#ffffff" opacity="0.12" />
                    </svg>
                  </div>
                )}

                {/* Quadrant 4 Content */}
                {item.type === "swatch" && (
                  <div className="color-matching-layout">
                    <div className="swatch-bars-row">
                      <div className="swatch-bar green-gradient-bar">
                        <div className="step-block g1"></div>
                        <div className="step-block g2"></div>
                        <div className="step-block g3"></div>
                        <div className="step-block g4"></div>
                      </div>
                      <div className="swatch-bar grayscale-gradient-bar">
                        <div className="step-block b1"></div>
                        <div className="step-block b2"></div>
                        <div className="step-block b3"></div>
                        <div className="step-block b4"></div>
                      </div>
                    </div>
                    <div className="asymmetric-paint-row">
                      <div className="paint-swatch-card custom-pine-dark"><span>Pine Dark</span></div>
                      <div className="paint-swatch-card custom-pine-deep"><span>Pine Deep</span></div>
                      <div className="paint-swatch-card custom-pine-green"><span>Pine Green</span></div>
                    </div>
                  </div>
                )}

              </div>

              {/* Symmetrical Bottom Label Footer (Masked for GSAP split reveal) */}
              <div className="text-overflow-mask">
                <div className="texture-foot-text">{item.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </section>
  );
}
