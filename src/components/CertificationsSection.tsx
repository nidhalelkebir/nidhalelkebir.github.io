"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  certifications,
  certificationsByDate,
  personalInfo,
  type Certification,
} from "@/data/portfolio";
import { FaTimes, FaExternalLinkAlt, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";

const INITIAL_VISIBLE = 12;

const levelColor = (level: string | null) => {
  switch (level) {
    case "Advanced":
      return "border-white/20 text-foreground/75";
    case "Intermediate":
      return "border-white/12 text-foreground/55";
    default:
      return "border-white/10 text-foreground/40";
  }
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [issuerFilter, setIssuerFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"relevance" | "recent">("relevance");
  const [expanded, setExpanded] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelectedCert(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const issuers = useMemo(() => {
    const counts = new Map<string, number>();
    certifications.forEach((c) => counts.set(c.issuer, (counts.get(c.issuer) ?? 0) + 1));
    return ["All", ...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name)];
  }, []);

  const filtered = useMemo(() => {
    const source = sortBy === "relevance" ? certifications : certificationsByDate;
    return issuerFilter === "All"
      ? source
      : source.filter((c) => c.issuer === issuerFilter);
  }, [issuerFilter, sortBy]);

  const visible = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);

  return (
    <section id="certifications" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Live from Credly"
          title="Certifications"
          subtitle="Synced straight from my public Credly profile at build time — every badge is verifiable."
          inView={inView}
        >
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs">
            <span className="flex items-center gap-2 text-foreground/60">
              <FaCheckCircle size={12} />
              {certifications.length} verified badges
            </span>
            <span className="text-foreground/35">
              {issuers.length - 1} issuing organizations
            </span>
            <a
              href={personalInfo.credly}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground/60 underline decoration-white/20 underline-offset-4 transition-colors hover:text-foreground"
            >
              <FaShieldAlt size={12} />
              View Credly profile
            </a>
          </div>
        </SectionHeading>

        {/* Issuer filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-8 flex flex-wrap items-center gap-2"
        >
          {issuers.map((issuer) => {
            const active = issuer === issuerFilter;
            return (
              <button
                key={issuer}
                onClick={() => {
                  setIssuerFilter(issuer);
                  setExpanded(false);
                }}
                className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-all duration-300 ${
                  active
                    ? "border-white/25 bg-white/10 text-foreground"
                    : "border-white/10 bg-white/[0.03] text-foreground/55 hover:border-white/20 hover:text-foreground/80"
                }`}
              >
                {issuer}
              </button>
            );
          })}

          {/* Ordering */}
          <div className="ml-auto flex items-center gap-1 font-mono text-[11px]">
            <span className="mr-1 text-foreground/25">Sort</span>
            {(
              [
                ["relevance", "Most relevant"],
                ["recent", "Most recent"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                aria-pressed={sortBy === key}
                className={`rounded px-2 py-1 transition-colors ${
                  sortBy === key
                    ? "text-foreground underline decoration-white/30 underline-offset-4"
                    : "text-foreground/40 hover:text-foreground/70"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Badge grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((cert, index) => (
              <motion.div
                layout
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: Math.min(index, 11) * 0.05 }}
              >
                <TiltCard
                  max={8}
                  onClick={() => setSelectedCert(cert)}
                  className="section-shell glass-edge group relative flex cursor-pointer items-start gap-4 overflow-hidden rounded-xl p-5"
                >
                  

                  {/* Badge floats above the card surface on tilt */}
                  <div className="relative h-20 w-20 shrink-0 transition-opacity duration-300">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="80px"
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="relative min-w-0 flex-1 ">
                    <h3 className="line-clamp-2 font-mono text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-foreground">
                      {cert.title}
                    </h3>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-foreground/45">
                      {cert.issuer}
                      {cert.authorizedBy && (
                        <span className="text-foreground/30"> · {cert.authorizedBy}</span>
                      )}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] text-foreground/40">
                        {formatDate(cert.date)}
                      </span>
                      {cert.level && (
                        <span
                          className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${levelColor(
                            cert.level
                          )}`}
                        >
                          {cert.level}
                        </span>
                      )}
                    </div>

                    {cert.skills.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {cert.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-foreground/50"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="font-mono text-[10px] text-cyber-blue/70">
                            +{cert.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length > INITIAL_VISIBLE && (
          <div className="mt-10 flex">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="rounded-full border border-white/12 bg-white/[0.04] px-7 py-3 font-mono text-xs uppercase tracking-[0.16em] text-foreground/80 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:text-foreground"
            >
              {expanded
                ? "Show less"
                : `Show all ${filtered.length} badges`}
            </button>
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ scale: 0.94, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.94, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="section-shell rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-start gap-4 p-5 border-b border-cyber-green/20 sticky top-0 bg-dark-800/95 backdrop-blur z-10">
                  <div className="min-w-0">
                    <h3 className="font-mono text-base sm:text-lg text-cyber-green font-bold leading-snug">
                      {selectedCert.title}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-cyber-blue/70 mt-1">
                      {selectedCert.issuer}
                      {selectedCert.authorizedBy && ` · authorized by ${selectedCert.authorizedBy}`}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="text-foreground/50 hover:text-cyber-red transition-colors p-1 shrink-0"
                    aria-label="Close modal"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <div className="relative w-40 h-40 shrink-0 ">
                      <Image
                        src={selectedCert.image}
                        alt={selectedCert.title}
                        fill
                        sizes="160px"
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-1 rounded-full border border-foreground/15 text-foreground/60">
                          Issued {formatDate(selectedCert.date)}
                        </span>
                        {selectedCert.level && (
                          <span
                            className={`font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-1 rounded-full border ${levelColor(
                              selectedCert.level
                            )}`}
                          >
                            {selectedCert.level}
                          </span>
                        )}
                      </div>

                      <p className="font-mono text-sm text-foreground/75 leading-relaxed">
                        {selectedCert.description}
                      </p>

                      <a
                        href={selectedCert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-cyber-green border border-cyber-green/40 rounded-full px-4 py-2 hover:bg-cyber-green/10 transition-all"
                      >
                        <FaExternalLinkAlt size={11} />
                        Verify on Credly
                      </a>
                    </div>
                  </div>

                  {selectedCert.skills.length > 0 && (
                    <div className="mt-8">
                      <span className="font-mono text-xs text-cyber-blue">Skills validated:</span>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {selectedCert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="font-mono text-[11px] text-foreground/65 bg-dark-700/60 border border-foreground/10 rounded-md px-2 py-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
