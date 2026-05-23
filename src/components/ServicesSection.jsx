import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { servicesData } from "../data/siteData";
import "./ServicesSection.css";

export default function ServicesSection() {
  // Initialize to null so no elements are filled or visible by default
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="custom-services-section" className="section light">
      <SectionHeader title="FEATURED PROJECTS" />
      
      {/* Container level listener removes the image when cursor completely exits */}
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

              {/* Right Side: Centered Hover Preview Image */}
              <div className="accordion-title-box">
                <h3>{service.title}</h3>
              </div>
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
