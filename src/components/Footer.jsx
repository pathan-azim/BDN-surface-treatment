import { useState } from "react";
import "./ContactSection.css";
import map from "../assets/map.png"; // Placeholder map image
export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    coatingRequest: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <section className="section contact-main-section" id="contact">
      <div className="contact-grid-matrix">
        
        {/* TOP LEFT BLOCK: Section Main Title */}
        <div className="matrix-block title-block">
          <h2 className="section-title">Contact Form</h2>
        </div>

        {/* TOP RIGHT BLOCK: Interactive Entry Form */}
        <div className="matrix-block form-block">
          <form onSubmit={handleSubmit} className="premium-form">
            <div className="form-row-split">
              <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input 
                type="tel" 
                name="phone" 
                placeholder="+123" 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="file-upload-zone">
              <label className="upload-label-title">File uploads</label>
              <div className="upload-actions">
                <button type="button" className="action-btn file-type-btn">Drop/all type</button>
                <label className="action-btn upload-trigger">
                  File upload
                  <input type="file" style={{ display: "none" }} />
                </label>
              </div>
            </div>

            <textarea 
              name="message" 
              placeholder="Message" 
              rows="3"
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <div className="coating-request-zone">
              <label className="upload-label-title">Coating request</label>
              <textarea 
                name="coatingRequest" 
                placeholder="Specific request" 
                rows="3"
                value={formData.coatingRequest}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="form-submit-btn">Contact</button>
          </form>
        </div>

        {/* BOTTOM LEFT BLOCK: Map View Box */}
        <div className="matrix-block map-block">
          <div className="map-wrapper-frame">
            {/* Minimalist Map Image placeholder matching design */}
            <img 
              src={map} 
              alt="Location Map Vector" 
              className="map-graphic-asset"
            />
            {/* Map Custom Floating Pin */}
            <div className="map-pin-indicator">
             
            </div>
            {/* Decorative Vector Logo Accent on lower left */}
            <div className="map-brand-accent">⋉</div>
          </div>
        </div>

        {/* BOTTOM RIGHT BLOCK: Contact Info / Coordinates */}
       <div className="matrix-block metadata-block">
  <h2 className="info-main-title">Contact Us</h2>
  
  <div className="info-details-layout">
    {/* Left Column: Management & Identity */}
    <div className="info-column">
      <h4>Executive Leadership</h4>
      <p style={{ fontWeight: "700", fontSize: "1.2rem", margin: "0 0 4px 0" }}>Mr. Sameer M. Patel</p>
      <p style={{ color: "#555" }}>Managing Director</p>
      
      <h4 className="spacing-top">Direct Line</h4>
      <p>
        <a href="tel:+918983477338" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <span>📞</span> +91 89834 77338
        </a>
      </p>
      
      <h4 className="spacing-top">Email Dispatch</h4>
      <p>
        <a href="mailto:bdnsurfacetreamentsolution@gmail.com" style={{ fontSize: "0.9rem" }}>
          bdnsurfacetreamentsolution@gmail.com
        </a>
      </p>
    </div>
    
    {/* Right Column: Headquarters Address Details */}
    <div className="info-column">
      <h4>Corporate Office Address</h4>
      <p style={{ textTransform: "uppercase", lineHeight: "1.6" }}>
        GANESH SAMRAJYA CHOWK, PLOT NO. D25/26/27,<br />
        MAITRI PARK, KHADI MACHINE ROAD,<br />
        behind HOTEL AAMANTRAN,<br />
        Moshi, Maharashtra 411070
      </p>
    </div>
  </div>
</div>


      </div>

      {/* FOOTER METADATA SUB-BAR */}
      <footer className="contact-section-footer">
        <div className="footer-left">agency@newcase.com</div>
        <div className="footer-right">
          <span>Email</span>
          <span>Form</span>
        </div>
      </footer>
    </section>
  );
}
