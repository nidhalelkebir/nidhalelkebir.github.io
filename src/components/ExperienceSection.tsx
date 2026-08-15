"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experiences } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";

export default function ExperienceSection() {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });

  return (
    <section id="experience" className="py-20 px-4" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Career log"
          title="Experience"
          subtitle="Four internships across telecom networking, airport IT, hardware support, and web development."
          inView={inView}
        />

        <div className="relative">
          {/* Glowing spine */}
          <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-white/10" />

          <div className="space-y-5">
            {experiences.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: 28 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14"
              >
                {/* Node */}
                <span className="absolute left-[10px] top-7 flex h-5 w-5 items-center justify-center">
                  
                  <span className="relative h-2.5 w-2.5 rounded-full bg-white/30 " />
                </span>

                <div className="section-shell glass-edge group relative overflow-hidden rounded-xl p-6 transition-colors">
                  

                  <div className="relative">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-cyber-blue">
                        {item.period}
                      </span>
                      <span className="font-mono text-xs text-foreground/25">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-4 font-mono text-xl font-semibold leading-snug text-foreground">
                      {item.role}
                    </h3>
                    <p className="mt-1.5 font-mono text-sm text-foreground/50">
                      {item.organization}
                    </p>
                    <p className="mt-4 font-mono text-sm leading-relaxed text-foreground/60">
                      {item.summary}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-foreground/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
