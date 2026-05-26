import { useRef } from "react";
import SectionHeader from "./SectionHeader";
import { processItems } from "../data/sitedata";
import "./ProcessSection.css";

// Import GSAP dependencies
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // 1. Grab all rows as an array
    const rows = gsap.utils.toArray(".process-row");

    // DIAGNOSTIC LOG: See if GSAP is actually finding your DOM nodes
    console.log("GSAP Found Rows Count:", rows.length);

    if (rows.length === 0) {
      console.warn("GSAP skipped execution: No elements matching '.process-row' were found in the DOM.");
      return;
    }

    rows.forEach((row, index) => {
      const imgBlock = row.querySelector(".process-image-block");
      const textBlock = row.querySelector(".process-text-block");
      const isReversed = row.classList.contains("reversed");

      // DIAGNOSTIC LOG: Verify inner blocks exist
      console.log(`Row [${index}] Structure Check:`, { imgBlock, textBlock });

      if (!imgBlock || !textBlock) {
        console.error(`Row [${index}] is missing an image or text block container!`);
        return;
      }

      // Build out the scroll timeline per row
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 85%", 
          toggleActions: "play none none none",
          // Uncomment the line below to visually debug the start/end markers in your browser
          // markers: true, 
        }
      });

      tl.from(imgBlock, {
        x: isReversed ? 100 : -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      })
      .from(textBlock, {
        x: isReversed ? -80 : 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6");
    });

    // 2. Layout Recalculation Insurance: Forces ScrollTrigger to update 
    // its triggers once everything (including large images) finishes loading.
    const handleLoadRefresh = () => {
      console.log("Window loaded fully. Refreshing ScrollTrigger markers...");
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoadRefresh);

    // Cleanup listener on unmount
    return () => window.removeEventListener("load", handleLoadRefresh);

  }, { scope: sectionRef });

  return (
    <section id="process" className="section light" ref={sectionRef} style={{ overflow: "hidden" }}>
      <SectionHeader title="PROCESS SECTION" badge="NEW" />
      
      <div className="alternating-container">
        {processItems.map((item, i) => {
          const isReversed = i % 2 !== 0;

          return (
            <article 
              className={`process-row ${isReversed ? "reversed" : ""}`} 
              key={item.step || i}
            >
              {/* Image Side */}
              <div className="process-image-block">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                />
              </div>
              
              {/* Text/Description Side */}
              <div className="process-text-block">
                <span className="step-number">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}