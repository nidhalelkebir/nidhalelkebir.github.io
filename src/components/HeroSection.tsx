"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { FaChevronDown } from "react-icons/fa";

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const strings = personalInfo.typingStrings;
    const currentString = strings[currentStringIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentString.substring(0, displayText.length + 1));
          if (displayText === currentString) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(currentString.substring(0, displayText.length - 1));
          if (displayText === "") {
            setIsDeleting(false);
            setCurrentStringIndex((prev) => (prev + 1) % strings.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, currentStringIndex, isDeleting]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4"
    >
      <div className="text-center z-10 max-w-4xl mx-auto">
        {/* Decorative top line */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-cyber-green to-transparent mb-8 mx-auto max-w-md"
        />

        {/* Terminal prefix */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-cyber-blue text-sm sm:text-base mb-4"
        >
          root@kali:~# ./introduce.sh
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold font-mono mb-4 glitch-text"
        >
          <span className="text-foreground">{"{"}</span>
          <span className="text-cyber-green"> {personalInfo.name} </span>
          <span className="text-foreground">{"}"}</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="font-mono text-lg sm:text-xl md:text-2xl mb-2 h-10"
        >
          <span className="text-cyber-green/60">&gt; </span>
          <span className="text-cyber-blue">{displayText}</span>
          <span className="text-cyber-green animate-pulse">█</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-foreground/60 font-mono text-sm sm:text-base mb-10 max-w-lg mx-auto"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3 font-mono text-sm border border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-dark-900 transition-all duration-300 neon-border-green"
          >
            <span className="relative z-10">[ View Projects ]</span>
          </a>
          <a
            href="#certifications"
            className="group relative px-8 py-3 font-mono text-sm border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-dark-900 transition-all duration-300 neon-border-blue"
          >
            <span className="relative z-10">[ Certifications ]</span>
          </a>
          <a
            href={personalInfo.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-3 font-mono text-sm bg-cyber-green/10 border border-cyber-green/50 text-cyber-green hover:bg-cyber-green/20 transition-all duration-300"
          >
            <span className="relative z-10">↓ Download CV</span>
          </a>
        </motion.div>

        {/* Decorative bottom line */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 1, delay: 1.8 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-cyber-green to-transparent mt-12 mx-auto max-w-md"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2.5, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cyber-green/50"
      >
        <FaChevronDown size={20} />
      </motion.div>
    </section>
  );
}
