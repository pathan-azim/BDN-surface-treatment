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
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 12;

      if (value >= 100) {
        value = 100;
      }

      setProgress(Math.floor(value));

      if (value === 100) {
        clearInterval(interval);

        setTimeout(() => {
          gsap.to(".loader-wrapper", {
            opacity: 0,
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {
              setLoading(false);

              setTimeout(() => {
                document.body.style.overflow = "auto";
              }, 100);
            },
          });

          gsap.fromTo(
            ".page",
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1.4,
              ease: "power3.out",
              delay: 0.3,
            }
          );
        }, 600);
      }
    }, 120);

    document.body.style.overflow = "hidden";

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading && (
        <div className="loader-wrapper">
          <LoadingScreen progress={progress} />
        </div>
      )}

      <div
        className="page"
        style={{
          opacity: loading ? 0 : 1,
        }}
      >
        <Topbar />

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