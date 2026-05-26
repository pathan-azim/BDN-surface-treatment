import { useState, useRef } from "react";
import SectionHeader from "./SectionHeader";
import { servicesData } from "../data/siteData";
import "./ServicesSection.css";

// Import GSAP, ScrollTrigger, and SplitType
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Target all h3 headers inside the rows
    const targets = gsap.utils.toArray(".accordion-title-box h3");

    // 2. Break down the text elements into single characters
    const splitInstances = targets.map((target) => {
      return new SplitType(target, { types: "chars", charClass: "gsap-char" });
    });

    // 3. Orchestrate the entrance timeline
    gsap.from(".gsap-char", {
      scrollTrigger: {
        trigger: ".accordion-list-wrapper",
        start: "top 80%", // Animates when the list enters 80% viewport height
        toggleActions: "play none none none",
      },
      yPercent: 100,       // Pushes them down past their overflow mask container
      opacity: 0,
      duration: 0.8,
      stagger: 0.02,       // Delays each letter slightly for a smooth wave effect
      ease: "power4.out",  // Premium fast-to-slow deceleration
    });

    // Cleanup split instances on component unmount
    return () => {
      splitInstances.forEach((instance) => instance.revert());
    };
  }, { scope: containerRef });

  return (
    <section id="custom-services-section" className="section light" ref={containerRef}>
      <SectionHeader title="FEATURED PROJECTS" />
      
      <div 
        className="accordion-list-wrapper"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {servicesData.map((service, i) => {
          const isActive = hoveredIndex === i;

          return (
            <article
              key={i}
              className={`accordion-row-item ${isActive ? "row-is-active" : ""}`}
              onMouseEnter={() => setHoveredIndex(i)}
            >
              {/* Left Side: Large Bold Title */}
              <div className="accordion-title-box">
                <h3>{service.title}</h3>
              </div>

              {/* Right Side: Centered Hover Preview Image */}
              <div className="accordion-image-box">
                {service.imageUrl && (
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="accordion-preview-img"
                  />
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}