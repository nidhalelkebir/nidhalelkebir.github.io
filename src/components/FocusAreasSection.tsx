"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaShieldAlt, FaBug, FaNetworkWired, FaTerminal } from "react-icons/fa";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";

const focusAreas = [
  {
    title: "Network Defense",
    description:
      "Traffic monitoring, anomaly detection, and practical hardening strategies for resilient infrastructure.",
    icon: FaNetworkWired,
    glow: "rgba(0,229,255,0.35)",
    accent: "text-cyber-blue",
    ring: "border-cyan-400/30 bg-cyan-400/10",
  },
  {
    title: "Penetration Testing",
    description:
      "Structured recon, vulnerability validation, and exploitation workflows with clear remediation outputs.",
    icon: FaBug,
    glow: "rgba(255,45,111,0.35)",
    accent: "text-cyber-red",
    ring: "border-rose-400/30 bg-rose-400/10",
  },
  {
    title: "Secure Operations",
    description:
      "Hands-on endpoint setup, access provisioning, and support practices aligned with security-first operations.",
    icon: FaShieldAlt,
    glow: "rgba(168,85,247,0.35)",
    accent: "text-cyber-purple",
    ring: "border-violet-400/30 bg-violet-400/10",
  },
  {
    title: "Applied Research",
    description:
      "Applied practice in web, Linux, and privilege-escalation techniques against controlled targets.",
    icon: FaTerminal,
    glow: "rgba(34,255,136,0.35)",
    accent: "text-cyber-green",
    ring: "border-emerald-400/30 bg-emerald-400/10",
  },
];

export default function FocusAreasSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Core tracks"
          title="Focus Areas"
          subtitle="The four areas where my training, certifications, and hands-on work concentrate."
          inView={inView}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;

            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 34 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="section-shell glass-edge relative overflow-hidden rounded-xl p-6 sm:p-7">
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl"
                    style={{ background: area.glow }}
                  />

                  <div className="tilt-layer relative">
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border ${area.ring}`}
                      >
                        <Icon className={`${area.accent} text-lg`} />
                      </div>
                      <span className="font-mono text-xs text-foreground/25">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-6 font-mono text-xl font-semibold text-foreground">
                      {area.title}
                    </h3>
                    <p className="mt-3 font-mono text-sm leading-relaxed text-foreground/60">
                      {area.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
