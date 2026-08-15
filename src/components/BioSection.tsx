"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { personalInfo } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import { FaCrosshairs, FaToolbox, FaServer, FaFlag } from "react-icons/fa";

const highlights = [
  {
    icon: FaCrosshairs,
    title: "Offensive focus",
    text: "Penetration testing and vulnerability research as my primary specialization.",
  },
  {
    icon: FaToolbox,
    title: "Hands-on toolkit",
    text: "Kali Linux, Nmap, Wireshark, Burp Suite, and Metasploit in a personal lab.",
  },
  {
    icon: FaServer,
    title: "Real IT ops",
    text: "Network operations, support, and secure environment setup across four internships.",
  },
  {
    icon: FaFlag,
    title: "Continuous practice",
    text: "Structured CTF and lab work covering web, Linux, and privilege escalation.",
  },
];

export default function BioSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="bio" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Profile" title="Who I Am" inView={inView} />

        <div className="grid gap-5 lg:grid-cols-5">
          {/* Summary panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="section-shell glass-edge relative overflow-hidden rounded-xl p-7 lg:col-span-3"
          >
            

            <div className="relative">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">
                <span className="h-1.5 w-1.5 rounded-full bg-white/30 " />
                Summary
              </div>

              <p className="mt-5 font-mono text-[15px] leading-[1.85] text-foreground/75">
                {personalInfo.bio}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {["Kali Linux", "Nmap", "Wireshark", "Burp Suite", "Metasploit", "Python"].map(
                  (tool) => (
                    <span
                      key={tool}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-foreground/60"
                    >
                      {tool}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Highlight stack */}
          <div className="grid gap-4 lg:col-span-2">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + index * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="section-shell group flex items-start gap-4 rounded-xl p-5 transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-foreground/70 transition-colors group-hover:border-white/25">
                    <Icon size={15} />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-1.5 font-mono text-xs leading-relaxed text-foreground/55">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
