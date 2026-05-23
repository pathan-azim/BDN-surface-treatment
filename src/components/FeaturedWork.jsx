import SectionHeader from "./SectionHeader";
import { featuredWorks } from "../data/sitedata";
import "./FeaturedWork.css"; // Import the tailored styles

export default function FeaturedWork() {
  // Map index positions to custom layout class names matching the grid layout image
  const cardLayoutStyles = [
    "bento-top-left",     // 0: Large square (spans 3 columns)
    "bento-top-right",    // 1: Medium square (spans 3 columns)
    "bento-bottom-left",  // 2: Small dark block (spans 2 columns)
    "bento-bottom-mid",   // 3: Small wide image (spans 2 columns)
    "bento-bottom-right"  // 4: Tall vertical block (spans 2 columns)
  ];

  return (
    <section id="work" className="section light">
      <SectionHeader title="FULL FEATURED WORK" badge="Portfolio" />
      
      <div className="bento-container">
        {featuredWorks.slice(0, 5).map((item, i) => {
          const layoutClass = cardLayoutStyles[i] || "";

          return (
            <article className={`bento-item ${layoutClass}`} key={i}>
              {/* Render background images for cards that use them */}
              {item.imageUrl && (
                <div className="bento-bg">
                  <img src={item.imageUrl} alt={item.title} />
                </div>
              )}
              
              {/* Card Meta Content Block */}
              <div className="bento-content">
                <div className="bento-text">
                  <h3>{item.title}</h3>
                  {item.subtitle && <p>{item.subtitle}</p>}
                </div>
                
                {/* Modern Pill Button from the layout */}
                <button className="bento-btn" aria-label="Details">
                  <span>Подробнее</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
