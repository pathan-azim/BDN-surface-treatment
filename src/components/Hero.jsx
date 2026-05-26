import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import PowderCoatingCanvas from "./PowdercoatingCanvas";
import PowdercloudCanvas from "./PowdercloudCanvas";

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    // 1. Split the text into individual characters
    const splitText = new SplitType(textRef.current, { 
      types: "chars", 
      charClass: "hero-char" 
    });

    const tl = gsap.timeline();

    // 2. Character Reveal: Characters slide up from the bottom of their mask container
    tl.from(".hero-char", {
      yPercent: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.03, // Rapid fluid reveal across the headline
      ease: "power4.out",
    })
    
    // 3. Video Entrance: Your custom heavy elastic scale and spin setup
    .from(videoRef.current, {
      scale: 0,
      rotation: -45,
      opacity: 0,
      duration: 3,
      ease: "elastic.out(1.2, 0.75)", 
    }, "-=1.4"); // Adjusted overlap to match the longer character stagger sequence

    // Clean up split instances on unmount to keep the DOM pristine
    return () => splitText.revert();
  }, { scope: containerRef });

  return (
    <section className="hero" ref={containerRef} style={{ overflow: "hidden", position: "relative" }}>
      <div className="hero-text">
        <h1 ref={textRef}>UNYIELDING FINISHES.<br />PREMIUM<br/>PROTECTION</h1>
      </div>
      
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: "40vw",
          height: "40vw",
          position: "absolute",
          objectFit: "cover",
          marginBottom: "60vh",
          top: "-10%",
          marginLeft: "60vh",
          clipPath: "circle(50% at 50% 50%)", 
          borderRadius: "50%",
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