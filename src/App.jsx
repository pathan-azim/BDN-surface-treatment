import "./App.css";
import { useEffect, useState } from "react";
import gsap from "gsap";

import Topbar from "./components/Topbar";
import Hero from "./components/Hero";
import FeaturedWork from "./components/FeaturedWork";
import FacilityTour from "./components/FacilityTour";
import ProcessSection from "./components/ProcessSection";
import ServicesSection from "./components/ServicesSection";
import LogoWall from "./components/LogoWall";
import Footer from "./components/ContactSection";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scrolling while loading
    document.body.style.overflow = "hidden";

    const videoUrl = "/BDN-surface-treatment/spiralsphere.webm";
    const imageUrls = []; 

    let loadedCount = 0;
    const totalAssets = 1 + imageUrls.length;

    // Direct configuration object reference to bypass the stale closure bug safely
    const progressObject = { current: 0 };

    const updateProgressState = (targetValue) => {
      gsap.to(progressObject, {
        current: targetValue,
        duration: 0.4,
        ease: "power1.out",
        onUpdate: () => {
          // Pulls values reliably from the live mutating object
          setProgress(Math.floor(progressObject.current));
        },
        onComplete: () => {
          if (targetValue === 100) {
            triggerExitAnimations();
          }
        }
      });
    };

    const itemLoaded = () => {
      loadedCount++;
      const currentTarget = Math.floor((loadedCount / totalAssets) * 100);
      updateProgressState(currentTarget);
    };

    // Preload the Hero Video
    const videoElement = document.createElement("video");
    videoElement.src = videoUrl;
    videoElement.preload = "auto";
    videoElement.muted = true;
    videoElement.playsInline = true;

    videoElement.addEventListener("canplaythrough", itemLoaded, { once: true });
    videoElement.load(); 

    // Preload Images
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = itemLoaded;
      img.onerror = itemLoaded; 
    });

    // Handle Exit Animations
    const triggerExitAnimations = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setLoading(false);
          document.body.style.overflow = "auto";
        }
      });

      tl.to(".loader-wrapper", {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut"
      })
      .fromTo(".page", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
    };

    return () => {
      videoElement.removeEventListener("canplaythrough", itemLoaded);
    };
  }, []);

  return (
    <>
      <div 
        className="loader-wrapper" 
        style={{ 
          position: "fixed", 
          inset: 0, 
          zIndex: 9999,
          pointerEvents: loading ? "all" : "none"
        }}
      >
        <LoadingScreen progress={progress} />
      </div>

      <div className="page">
       
        <main>
          <Hero startAnimation={!loading} />
          <FacilityTour />
          <FeaturedWork />
          <ProcessSection />
          <ServicesSection />
          <LogoWall />
        </main>
        <Footer />
      </div>
    </>
  );
}
