import "./App.css";
import Topbar from "./components/Topbar";
import Hero from "./components/Hero";
import FeaturedWork from "./components/FeaturedWork";
import FacilityTour from "./components/FacilityTour";
import ProcessSection from "./components/ProcessSection";
import ServicesSection from "./components/ServicesSection";
import LogoWall from "./components/LogoWall";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="page">
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
    </div>
  );
}
