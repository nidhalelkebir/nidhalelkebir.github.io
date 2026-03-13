"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Bio", href: "#bio" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-900/88 backdrop-blur-xl border-b border-cyber-green/20 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="#home" className="flex items-center space-x-2 group">
            <span className="text-cyber-green font-mono text-lg font-bold group-hover:neon-green-glow transition-all">
              &lt;/&gt;
            </span>
            <span className="text-foreground font-mono text-sm hidden sm:block">
              Nidhal El Kebir
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm font-mono text-foreground/70 hover:text-cyber-green transition-colors relative group"
              >
                <span className="text-cyber-green/60 group-hover:text-cyber-green">
                  ~/
                </span>
                {item.label.toLowerCase()}
                <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-cyber-green transition-all duration-300" />
              </Link>
            ))}

          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-cyber-green"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-dark-900/98 backdrop-blur-md border-b border-cyber-green/20"
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 font-mono text-sm text-foreground/70 hover:text-cyber-green hover:bg-cyber-green/5 rounded transition-colors"
            >
              <span className="text-cyber-green/60">$ cd </span>
              {item.label.toLowerCase()}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
