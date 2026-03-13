"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { personalInfo } from "@/data/portfolio";

const highlights = [
  "Offensive security and penetration testing focus",
  "Hands-on with Kali Linux, Nmap, Wireshark, Burp Suite, and Metasploit",
  "Experience in IT support, onboarding, and secure environment setup",
  "Active CTF player with practical web and network security skills",
];

export default function BioSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="bio" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-cyber-blue text-sm mb-2">
            $ cat profile/bio.md
          </p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-foreground">
            <span className="text-cyber-green">[</span>
            Professional Bio
            <span className="text-cyber-green">]</span>
          </h2>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-cyber-green/50 to-transparent mt-4 max-w-xs mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="section-shell overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-cyber-green/15 bg-dark-700/60">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyber-green/60">
              Summary
            </p>
            <p className="font-mono text-sm text-foreground/80 mt-2 leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -15 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.25 + index * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-dark-900/40 border border-cyber-green/10"
              >
                <span className="font-mono text-cyber-green text-sm mt-[2px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-mono text-sm text-foreground/75 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
