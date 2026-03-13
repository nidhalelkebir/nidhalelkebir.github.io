"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experiences } from "@/data/portfolio";

export default function ExperienceSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="experience" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-cyber-blue text-sm mb-2">$ cat career_timeline.log</p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-foreground">
            <span className="text-cyber-green">[</span>
            Experience
            <span className="text-cyber-green">]</span>
          </h2>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-cyber-green/50 to-transparent mt-4 max-w-xs mx-auto" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-3 sm:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyber-green/40 via-cyber-blue/30 to-transparent" />

          <div className="space-y-6">
            {experiences.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                className="relative pl-10 sm:pl-0"
              >
                <span className="absolute left-[7px] sm:left-1/2 sm:-translate-x-1/2 top-7 w-3 h-3 rounded-full bg-cyber-green shadow-[0_0_12px_rgba(0,255,65,0.6)]" />

                <div
                  className={`section-shell rounded-xl p-5 sm:p-6 sm:w-[48%] ${
                    index % 2 === 0 ? "sm:mr-auto" : "sm:ml-auto"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-cyber-blue/80">
                      {item.period}
                    </p>
                    <p className="font-mono text-xs text-cyber-green/70">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <h3 className="font-mono text-lg font-semibold text-foreground leading-snug">
                    {item.role}
                  </h3>
                  <p className="font-mono text-sm text-cyber-green/80 mt-1 mb-3">
                    {item.organization}
                  </p>
                  <p className="font-mono text-sm text-foreground/72 leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] px-2 py-1 bg-cyber-green/8 border border-cyber-green/20 text-cyber-green/85 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
