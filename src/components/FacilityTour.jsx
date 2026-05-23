import SectionHeader from "./SectionHeader";

import coatingprocess from "../assets/coatingprocess.mp4";
export default function FacilityTour() {
  return (
    <section className="section dark">
      <SectionHeader title="COMPLETE FACILITY TOUR" inverse />
      <div className="video-card">
        <video src={coatingprocess} muted loop autoPlay ></video>
       
      </div>
    </section>
  );
}
