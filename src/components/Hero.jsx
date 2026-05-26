import PowderCoatingCanvas from "./PowdercoatingCanvas";
import PowdercloudCanvas from "./PowdercloudCanvas";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <p>INDUSTRIAL POWDER COATING / SUPERIOR FINISHES / ADVANCED PROTECTION / PRECISION</p>
        <h1 >UNYIELDING FINISHES. PREMIUM PROTECTION.</h1>
      </div>
     <video
  autoPlay
  muted
  loop
  playsInline
  style={{
    width: "40vw",
    height: "40vw",
    // backgroundColor: "#093624",
    position: "absolute",
    objectFit: "cover",
    marginBottom: "60vh",
    top: "-10%",
    marginLeft: "60vh",
    cropPath: "circle(60% at 60% 60%)",
    borderRadius: "50%",
    // marginbottom: 0%",
    // posistion: "relative",
    zoom: 1.5,
  }}
>
  <source
    src="/BDN-surface-treatment/spiralsphere.webm"
    type="video/webm"
  />
</video>
      {/* <PowderCoatingCanvas/> */}
      {/* <PowdercloudCanvas/> */}
    </section>
  );
}
