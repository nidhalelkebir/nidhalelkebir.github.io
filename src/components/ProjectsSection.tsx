"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "@/data/portfolio";
import { FaGithub, FaExternalLinkAlt, FaFolderOpen } from "react-icons/fa";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";

export default function ProjectsSection() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section id="projects" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Build log"
          title="Projects"
          subtitle="Security tooling and developer utilities I have built — every one is public on GitHub."
          inView={inView}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard
                max={6}
                className="section-shell glass-edge group relative flex h-full flex-col overflow-hidden rounded-xl"
              >
                {/* Header band */}
                <div className="relative overflow-hidden border-b border-white/[0.07] px-6 py-5">
                  
                  

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/35">
                        <FaFolderOpen size={11} />
                        {project.role}
                      </div>
                      <h3 className="mt-2.5 font-mono text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-foreground">
                        {project.title}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-foreground/35">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-sm leading-relaxed text-foreground/60">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-foreground/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-3 pt-6">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 font-mono text-xs text-foreground/80 transition-all hover:border-white/25 hover:text-foreground"
                    >
                      <FaGithub size={13} />
                      Source
                    </a>
                    {project.demo && project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-xs text-foreground/75 transition-colors hover:border-white/25"
                      >
                        <FaExternalLinkAlt size={11} />
                        {project.demo.includes("npmjs.com") ? "View on npm" : "Live demo"}
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom accent sweep */}
                <div className="h-[2px] w-0 bg-white/20 transition-all duration-500 group-hover:w-full" />
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
