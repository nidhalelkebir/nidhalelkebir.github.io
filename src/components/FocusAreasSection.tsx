"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaShieldAlt, FaBug, FaNetworkWired, FaTerminal } from "react-icons/fa";

const focusAreas = [
  {
    title: "Network Defense",
    description:
      "Traffic monitoring, anomaly detection, and practical hardening strategies for resilient infrastructure.",
    icon: FaNetworkWired,
    accent: "text-cyber-blue",
  },
  {
    title: "Penetration Testing",
    description:
      "Structured recon, vulnerability validation, and exploitation workflows with clear remediation outputs.",
    icon: FaBug,
    accent: "text-cyber-red",
  },
  {
    title: "Secure Operations",
    description:
      "Hands-on endpoint setup, access provisioning, and support practices aligned with security-first operations.",
    icon: FaShieldAlt,
    accent: "text-cyber-blue",
  },
  {
    title: "CTF Practice",
    description:
      "Continuous challenge solving to sharpen web, Linux, and privilege-escalation skills under pressure.",
    icon: FaTerminal,
    accent: "text-cyber-green",
  },
];

export default function FocusAreasSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section className="py-12 sm:py-16 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-cyber-blue text-sm mb-2">$ cat focus-areas.md</p>
          <h2 className="font-mono text-2xl sm:text-3xl font-semibold text-foreground">
            Cybersecurity Focus Areas
          </h2>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-cyber-green/40 to-transparent mt-4 max-w-sm mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;

            return (
              <motion.article
                key={area.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                className="section-shell p-5 sm:p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2">
                    <Icon className={`${area.accent} text-base`} />
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground/60">
                      Core Track
                    </p>
                  </div>
                  <span className="font-mono text-xs text-cyber-green/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-mono text-lg text-foreground font-semibold mb-2">
                  {area.title}
                </h3>
                <p className="font-mono text-sm text-foreground/70 leading-relaxed">
                  {area.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
