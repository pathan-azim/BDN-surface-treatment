import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

export default function Hero({ startAnimation }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    // STOP animation until loader finishes
    if (!startAnimation) return;

    const splitText = new SplitType(textRef.current, {
      types: "chars",
      charClass: "hero-char",
    });

    const tl = gsap.timeline();

    tl.from(".hero-char", {
      yPercent: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.03,
      ease: "power4.out",
    })

    .from(
      videoRef.current,
      {
        scale: 0,
        rotation: -45,
        opacity: 0,
        duration: 3,
        ease: "elastic.out(1.2, 0.75)",
      },
      "-=1.4"
    );

    return () => splitText.revert();

  }, {
    scope: containerRef,
    dependencies: [startAnimation], // IMPORTANT
  });

  return (
    <section
      className="hero"
      ref={containerRef}
      style={{
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="hero-text">
        <h1 ref={textRef}>
          UNYIELDING FINISHES.
          <br />
          PREMIUM
          <br />
          PROTECTION
        </h1>
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
    </section>
  );
}