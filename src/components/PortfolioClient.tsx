"use client";

import { useState, useCallback } from "react";
import MatrixRain from "@/components/MatrixRain";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BioSection from "@/components/BioSection";
import FocusAreasSection from "@/components/FocusAreasSection";
import ExperienceSection from "@/components/ExperienceSection";
import HackerTerminal from "@/components/HackerTerminal";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ProjectsSection from "@/components/ProjectsSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function PortfolioClient() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <>
      {/* Matrix rain background */}
      <MatrixRain />

      {/* Scanline overlay */}
      <div className="scanlines" />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero */}
        <HeroSection />

        {/* Bio */}
        <BioSection />

        {/* Focus areas */}
        <FocusAreasSection />

        {/* Experience */}
        <ExperienceSection />

        {/* Stats */}
        <StatsSection />

        {/* Terminal */}
        <HackerTerminal />

        {/* Skills */}
        <SkillsSection />

        {/* Certifications */}
        <CertificationsSection />

        {/* Projects */}
        <ProjectsSection />

        {/* Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
