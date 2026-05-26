import "./App.css";
import { useEffect, useState } from "react";

import Topbar from "./components/Topbar";
import Hero from "./components/Hero";
import FeaturedWork from "./components/FeaturedWork";
import FacilityTour from "./components/FacilityTour";
import ProcessSection from "./components/ProcessSection";
import ServicesSection from "./components/ServicesSection";
import LogoWall from "./components/LogoWall";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [siteReady, setSiteReady] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    let animationFrame;

    // Smooth loading animation
    const animateProgress = () => {
      currentProgress += Math.random() * 4;

      if (currentProgress >= 92) {
        currentProgress = 92;
      }

      setProgress(Math.floor(currentProgress));

      animationFrame = requestAnimationFrame(animateProgress);
    };

    animateProgress();

    const handleLoad = () => {
      cancelAnimationFrame(animationFrame);

      let finalProgress = currentProgress;

      const finishLoading = () => {
        finalProgress += 2;

        if (finalProgress >= 100) {
          finalProgress = 100;
          setProgress(100);

          // Wait before revealing site
          setTimeout(() => {
            setLoading(false);

            // Render actual website AFTER loader disappears
            setTimeout(() => {
              setSiteReady(true);
            }, 100);

          }, 600);

          return;
        }

        setProgress(Math.floor(finalProgress));

        requestAnimationFrame(finishLoading);
      };

      finishLoading();
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // Loader first
  if (loading) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <div className="page">
      {siteReady && (
        <>
          <Topbar />

          <main>
            <Hero />
            <FacilityTour />
            <FeaturedWork />
            <ProcessSection />
            <ServicesSection />
            <LogoWall />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}