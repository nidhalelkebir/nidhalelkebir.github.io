"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Bio", href: "#bio" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
  { label: "Labs", href: "#labs" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the section currently closest to the top of the viewport
  useEffect(() => {
    const ids = navItems.map((i) => i.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#05060a]/70 backdrop-blur-xl border-b border-white/[0.07]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Scroll progress rail */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-white/25"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="#home" className="group flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10">
              <Image
                src="/skull.svg"
                alt="Ghost mark"
                width={20}
                height={20}
                className="transition-opacity duration-200 group-hover:opacity-80"
              />
              
            </span>
            <span className="hidden font-mono text-sm text-foreground/85 sm:block">
              Nidhal El Kebir
            </span>
          </Link>

          {/* Desktop nav — glass pill with sliding indicator */}
          <div className="hidden md:flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-xl">
            {navItems.map((item) => {
              const id = item.href.slice(1);
              const isActive = active === id;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors duration-300 ${
                    isActive ? "text-foreground" : "text-foreground/45 hover:text-foreground/80"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-white/10"
                    />
                  )}
                  <span className="relative z-10">{item.label.toLowerCase()}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-lg border border-white/10 bg-white/[0.04] p-2 text-cyber-blue"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden overflow-hidden border-b border-white/[0.07] bg-[#05060a]/95 backdrop-blur-xl"
      >
        <div className="space-y-1 px-4 py-4">
          {navItems.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2.5 font-mono text-sm transition-colors ${
                  isActive
                    ? "bg-cyan-400/10 text-cyber-blue"
                    : "text-foreground/65 hover:bg-white/[0.04] hover:text-foreground"
                }`}
              >
                <span className="text-cyber-blue/40">/</span>
                {item.label.toLowerCase()}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </motion.nav>
  );
}
