"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { personalInfo, certifications, projects } from "@/data/portfolio";
import { FaArrowRight, FaDownload } from "react-icons/fa";

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
            setTimeout(() => setIsDeleting(true), 2400);
          }
        } else {
          setDisplayText(currentString.substring(0, displayText.length - 1));
          if (displayText === "") {
            setIsDeleting(false);
            setCurrentStringIndex((prev) => (prev + 1) % strings.length);
          }
        }
      },
      isDeleting ? 40 : 90
    );

    return () => clearTimeout(timeout);
  }, [displayText, currentStringIndex, isDeleting]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center px-6 sm:px-10"
    >
      <div className="mx-auto w-full max-w-3xl">
        {/* Mark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image src="/skull.svg" alt="Ghost mark" width={34} height={34} priority />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 font-mono text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl"
        >
          {personalInfo.name}
        </motion.h1>

        {/* Typing line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 flex h-7 items-center font-mono text-base text-foreground/60 sm:text-lg"
        >
          {displayText}
          <span className="ml-1 inline-block h-[1.05em] w-[2px] animate-pulse bg-cyber-blue align-middle" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="mt-8 max-w-xl font-mono text-sm leading-relaxed text-foreground/45"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 font-mono text-sm text-[#0b0c0e] transition-opacity hover:opacity-85"
          >
            View work
            <FaArrowRight
              size={11}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href={personalInfo.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 px-5 py-2.5 font-mono text-sm text-foreground/75 transition-colors hover:border-white/25 hover:text-foreground"
          >
            <FaDownload size={11} />
            CV
          </a>
        </motion.div>

        {/* Facts */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/[0.07] pt-8"
        >
          {[
            { value: certifications.length, label: "Certifications" },
            { value: projects.length, label: "Projects" },
            { value: 4, label: "Internships" },
          ].map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-2xl text-foreground">{item.value}</dt>
              <dd className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/35">
                {item.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
