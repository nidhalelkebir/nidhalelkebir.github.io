"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { certifications } from "@/data/portfolio";
import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<(typeof certifications)[0] | null>(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="certifications" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-cyber-blue text-sm mb-2">
            $ ls ~/certifications/
          </p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-foreground">
            <span className="text-cyber-green">[</span>
            Certifications
            <span className="text-cyber-green">]</span>
          </h2>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent mt-4 max-w-xs mx-auto" />
        </motion.div>

        {/* Certification cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedCert(cert)}
              className="group cursor-pointer section-shell rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
            >
              {/* Certificate Image Placeholder */}
              <div className="relative h-28 bg-dark-700/70 overflow-hidden border-b border-cyber-green/10">
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/5 to-cyber-blue/5 flex items-center justify-center">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain p-2 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-cyber-green/0 group-hover:bg-cyber-green/5 transition-all duration-300 flex items-center justify-center">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-cyber-green opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                  </span>
                </div>
              </div>

              {/* Card Info */}
              <div className="p-4">
                <h3 className="font-mono text-sm font-semibold text-foreground group-hover:text-cyber-green transition-colors mb-2 line-clamp-2 leading-relaxed">
                  {cert.title}
                </h3>
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-cyber-blue/70">
                  {cert.issuer}
                </p>
                <p className="font-mono text-xs text-foreground/45 mt-2">
                  {cert.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="section-shell max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal header */}
                <div className="flex justify-between items-center p-4 border-b border-cyber-green/20">
                  <h3 className="font-mono text-lg text-cyber-green font-bold">
                    {selectedCert.title}
                  </h3>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="text-foreground/50 hover:text-cyber-red transition-colors p-1"
                    aria-label="Close modal"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>

                {/* Modal body */}
                <div className="p-6">
                  {/* Certificate image */}
                  <div className="relative w-full h-64 sm:h-80 bg-dark-700 rounded-lg overflow-hidden mb-6">
                    <Image
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-sm text-foreground/30">
                        Certificate Preview
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div>
                      <span className="font-mono text-xs text-cyber-blue">
                        Issuing Organization:
                      </span>
                      <p className="font-mono text-sm text-foreground">
                        {selectedCert.issuer}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-xs text-cyber-blue">
                        Date Earned:
                      </span>
                      <p className="font-mono text-sm text-foreground">
                        {selectedCert.date}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-xs text-cyber-blue">
                        Description:
                      </span>
                      <p className="font-mono text-sm text-foreground/80 leading-relaxed">
                        {selectedCert.description}
                      </p>
                    </div>
                    {selectedCert.credentialUrl && selectedCert.credentialUrl !== "#" && (
                      <a
                        href={selectedCert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 font-mono text-sm text-cyber-green hover:text-cyber-blue transition-colors mt-4"
                      >
                        <FaExternalLinkAlt size={12} />
                        <span>Verify Credential</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
