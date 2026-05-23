import SectionHeader from "./SectionHeader";
import { clientLogos } from "../data/siteData";
import "./LogoWall.css"; // Import the uniform logo grid styles

export default function LogoWall() {
  return (
    <section className="section light logos-section">
      <SectionHeader title="TRUSTED BY INDUSTRY LEADERS" badge="PARTNERS" />
      
      <div className="logo-grid-container">
        {clientLogos.map((logo, i) => (
          <div className="uniform-logo-item" key={logo.id || i}>
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
