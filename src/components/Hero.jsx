import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import Topbar from "./Topbar";

export default function Hero({ startAnimation }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);
  const splitRef = useRef(null);

  useGSAP(() => {
    // 1. Split text nodes IMMEDIATELY on mount
    if (!splitRef.current && textRef.current) {
      splitRef.current = new SplitType(textRef.current, {
        types: "chars",
        charClass: "hero-char",
      });
    }

    // 2. GUARD: Wait patiently for the loader
    if (!startAnimation) return;

    // 3. Set up the video's base state immediately before animating
    gsap.set(videoRef.current, { 
      visibility: "visible",
      opacity: 1,
      xPercent: -50, 
      yPercent: -50,
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
        scale: 0, // Animates smoothly from 0 to 1 multiplied by our CSS scale factor
        rotation: -45,
        duration: 2.5, 
        ease: "elastic.out(1.1, 0.75)",
        transformOrigin: "center center",
      },
      "-=1.0"
    );

    return () => {
      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }
    };
  }, {
    scope: containerRef,
    dependencies: [startAnimation], 
  });

  return (
    <>
      <Topbar startAnimation={startAnimation} />
      
      <section
        className="hero"
        ref={containerRef}
        style={{
          overflow: "hidden",
          position: "relative",
          width: "100%",
          height: "95vh", 
        }}
      >
        <div className="hero-text">
          <h1 
            ref={textRef} 
            style={{ opacity: startAnimation ? 1 : 0 }}
          >
            UNYIELDING FINISHES.
            <br />
            PREMIUM
            <br />
            PROTECTION
          </h1>
        </div>

        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto" 
          style={{
            position: "absolute",
            width: "45vw", 
            height: "45vw",
            objectFit: "cover",
            borderRadius: "50%",
            top: "55%",
            left: "75%",
            clipPath: "circle(50% at 50% 50%)",
            visibility: "hidden", 
            opacity: 0,
            /* REPLACED FIXED ZOOM: 
              We utilize a CSS Variable '--video-zoom' which scales the component layout frame natively
            */
            transform: "translate(-50%, -50%) scale(var(--video-zoom, 1.5))",
          }}
        >
          <source
            src="/BDN-surface-treatment/spiralsphere.webm"
            type="video/webm"
          />
        </video>
      </section>
    </>
  );
}