import SectionHeader from "./SectionHeader";

import coatingprocess from "../assets/coatingprocess.mp4";
export default function FacilityTour() {
  return (
    <section className="section dark">
      <SectionHeader title="COMPLETE FACILITY TOUR" inverse />
      <div className="video-card">
        <video src={coatingprocess} muted loop autoPlay ></video>
         <div id="moving-text">
        <div class="con">
          <h1> SUPERIOR FINISHES</h1>
          <div class="gola"></div>
          <h1>ADVANCED PROTECTION</h1>
          <div class="gola"></div>
          <h1>PRECISION</h1>
          <div class="gola"></div>
        </div>

        <div class="con">
          <h1> SUPERIOR FINISHES</h1>
          <div class="gola"></div>
          <h1>ADVANCED PROTECTION</h1>
          <div class="gola"></div>
          <h1>PRECISION</h1>
          <div class="gola"></div>
        </div>

        <div class="con">
          <h1> SUPERIOR FINISHES</h1>
          <div class="gola"></div>
          <h1>ADVANCED PROTECTION</h1>
          <div class="gola"></div>
          <h1>PRECISION</h1>
          <div class="gola"></div>
        </div>

      </div>
      </div>
    </section>
  );
}
