"use client";

import { personalInfo } from "@/data/portfolio";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-cyber-green/10 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Left */}
          <div className="font-mono text-xs text-foreground/40 text-center sm:text-left">
            <p>
              <span className="text-cyber-green">nidhal@portfolio:~$</span> echo
              &quot;Built with Next.js &amp; TailwindCSS&quot;
            </p>
            <p className="mt-1">
              &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
              reserved.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center space-x-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/40 hover:text-cyber-green transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/40 hover:text-cyber-blue transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-foreground/40 hover:text-cyber-green transition-colors"
              aria-label="Email"
            >
              <FaEnvelope size={18} />
            </a>

            {/* Back to top */}
            <button
              type="button"
              onClick={handleBackToTop}
              className="ml-4 p-2 border border-cyber-green/20 rounded text-foreground/40 hover:text-cyber-green hover:border-cyber-green/50 transition-all"
              aria-label="Back to top"
            >
              <FaArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
