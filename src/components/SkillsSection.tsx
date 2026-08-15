"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skillGroups } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";

export default function SkillsSection() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section id="skills" className="py-20 px-4" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Capabilities"
          title="Technical Skills"
          subtitle="Applied across internships, certification labs, and the projects listed below."
          inView={inView}
        />

        <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-4 py-8 md:grid-cols-[220px_1fr] md:gap-10"
            >
              <div>
                <h3 className="font-mono text-sm font-semibold text-foreground">{group.name}</h3>
                <p className="mt-2 font-mono text-xs leading-relaxed text-foreground/40">
                  {group.summary}
                </p>
              </div>

              <ul className="flex flex-wrap gap-x-6 gap-y-2.5 self-start">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[13px] text-foreground/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
