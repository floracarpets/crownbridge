import React from "react";
import PageMetadata from "./components/PageMetadata.jsx";
import SkipLink from "./components/SkipLink.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HeroSection from "./components/sections/HeroSection.jsx";
import IntroStrip from "./components/sections/IntroStrip.jsx";
import AboutSection from "./components/sections/AboutSection.jsx";
import ServicesSection from "./components/sections/ServicesSection.jsx";
import PropertiesSection from "./components/sections/PropertiesSection.jsx";
import WhyChooseUsSection from "./components/sections/WhyChooseUsSection.jsx";
import ProcessSection from "./components/sections/ProcessSection.jsx";
import ContactSection from "./components/sections/ContactSection.jsx";

export default function App() {
  return (
    <>
      <PageMetadata />
      <SkipLink />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <IntroStrip />
        <AboutSection />
        <ServicesSection />
        <PropertiesSection />
        <WhyChooseUsSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
