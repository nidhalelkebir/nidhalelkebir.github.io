"use client";

import { useState, useCallback, Suspense, lazy } from "react";
import dynamic from "next/dynamic";
import MatrixRain from "@/components/MatrixRain";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HackerTerminal from "@/components/HackerTerminal";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ProjectsSection from "@/components/ProjectsSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic";

// Dynamically import the 3D globe to avoid SSR issues with Three.js
const CyberGlobe3D = dynamic(() => import("@/components/CyberGlobe3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] sm:h-[400px] flex items-center justify-center">
      <span className="font-mono text-sm text-cyber-green/50 animate-pulse">
        Loading 3D Globe...
      </span>
    </div>
  ),
});

export default function PortfolioClient() {
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <>
      {/* Background music */}
      <BackgroundMusic enabled={soundEnabled} />

      {/* Matrix rain background */}
      <MatrixRain />

      {/* Scanline overlay */}
      <div className="scanlines" />

      {/* Navigation */}
      <Navbar soundEnabled={soundEnabled} toggleSound={toggleSound} />

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero */}
        <HeroSection />

        {/* 3D Globe section */}
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-4">
              <p className="font-mono text-xs text-cyber-green/50">
                [ Interactive 3D Cyber Globe - Drag to rotate ]
              </p>
            </div>
            <CyberGlobe3D />
          </div>
        </section>

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
