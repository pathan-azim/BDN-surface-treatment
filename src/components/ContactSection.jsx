import { useState } from "react";
import "./ContactSection.css";
import map from "../assets/map.png"; 

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    coatingRequest: "",
  });
  
  // Track file state separately
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setStatus({ type: "", message: "" });

  console.log("Preparing deployment bundle to send over port 5005...");

  const dataToSend = new FormData();
  dataToSend.append("name", formData.name);
  dataToSend.append("phone", formData.phone);
  dataToSend.append("email", formData.email);
  dataToSend.append("message", formData.message);
  dataToSend.append("coatingRequest", formData.coatingRequest);
  
  if (file && file[0]) {
    dataToSend.append("attachment", file[0]);
  }

  try {
    // Explicitly target localhost to override any broken DNS caching
    const response = await fetch("http://localhost:5005/api/contact", {
      method: "POST",
      body: dataToSend, 
    });

    const result = await response.json();

    if (response.ok) {
      setStatus({ type: "success", message: "Form submitted successfully!" });
      setFormData({ name: "", phone: "", email: "", message: "", coatingRequest: "" });
      setFile(null);
    } else {
      setStatus({ type: "error", message: result.error || "Submission failed." });
    }
  } catch (error) {
    console.error("Network Fetch Error Stack:", error);
    setStatus({ type: "error", message: "Network connection error. Server might be down." });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <section className="section contact-main-section" id="contact">
      <div className="contact-grid-matrix">
        
        {/* TOP LEFT BLOCK: Section Main Title */}
        <div className="matrix-block title-block">
          <h2 className="section-title">Contact Form</h2>
          {status.message && (
            <div className={`status-alert ${status.type}`} style={{
              marginTop: '15px', 
              padding: '10px', 
              borderRadius: '4px',
              backgroundColor: status.type === 'success' ? '#e6f4ea' : '#fce8e6',
              color: status.type === 'success' ? '#137333' : '#c5221f'
            }}>
              {status.message}
            </div>
          )}
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
  <label className="upload-label-title">
    {file && file[0] ? `Selected: ${file[0].name}` : "File uploads"}
  </label>
  <div className="upload-actions">
    <button type="button" className="action-btn file-type-btn">Drop/all type</button>
    <label className="action-btn upload-trigger" style={{ cursor: 'pointer' }}>
      {file && file[0] ? "Change File" : "File upload"}
      <input 
        type="file" 
        name="attachment"
        style={{ display: "none" }} 
        onChange={handleFileChange} 
      />
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

            <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Contact"}
            </button>
          </form>
        </div>

        {/* BOTTOM LEFT BLOCK: Map View Box */}
        <div className="matrix-block map-block">
          <div className="map-wrapper-frame">
            <img src={map} alt="Location Map Vector" className="map-graphic-asset" />
            <div className="map-pin-indicator"></div>
            <div className="map-brand-accent">⋉</div>
          </div>
        </div>

        {/* BOTTOM RIGHT BLOCK: Contact Info */}
        <div className="matrix-block metadata-block">
          <h2 className="info-main-title">Contact Us</h2>
          <div className="info-details-layout">
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
                <a href="mailto:bdnsurfacetreatmentsolution@gmail.com" style={{ fontSize: "0.9rem" }}>
                  bdnsurfacetreatmentsolution@gmail.com
                </a>
              </p>
            </div>
            
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
