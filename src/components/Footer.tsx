"use client";

import { personalInfo } from "@/data/portfolio";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaShieldAlt } from "react-icons/fa";

const socials = [
  { href: personalInfo.github, icon: FaGithub, label: "GitHub", hover: "hover:text-cyber-blue" },
  { href: personalInfo.linkedin, icon: FaLinkedin, label: "LinkedIn", hover: "hover:text-cyber-blue" },
  { href: personalInfo.credly, icon: FaShieldAlt, label: "Credly", hover: "hover:text-cyber-purple" },
  { href: `mailto:${personalInfo.email}`, icon: FaEnvelope, label: "Email", hover: "hover:text-cyber-green" },
];

export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-10 px-4 py-12">
      {/* Horizon glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-white/[0.07]" />

      <div className="mx-auto max-w-6xl">
        <div className="section-shell glass-edge flex flex-col items-center justify-between gap-6 rounded-xl p-6 sm:flex-row">
          <div className="text-center font-mono text-xs text-foreground/45 sm:text-left">
            <p className="flex items-center justify-center gap-2 sm:justify-start">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber-green opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-green" />
              </span>
              <span className="text-foreground/60">status:</span> live · badges synced from Credly
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} {personalInfo.name}. Built with Next.js, Three.js &amp; Tailwind.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-foreground/45 transition-colors hover:border-white/25 ${social.hover}`}
                >
                  <Icon size={16} />
                </a>
              );
            })}

            <button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              className="ml-2 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-foreground/70 transition-colors hover:border-white/25"
            >
              <FaArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
