"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "@/data/portfolio";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="projects" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-cyber-blue text-sm mb-2">
            $ find ~/projects -type f -name &quot;*.py&quot;
          </p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-foreground">
            <span className="text-cyber-green">~/</span>
            Projects
          </h2>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-cyber-green/50 to-transparent mt-4 max-w-xs mx-auto" />
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative section-shell rounded-lg overflow-hidden hover:shadow-[0_0_20px_rgba(0,255,65,0.1)] transition-all duration-500"
            >
              {/* Project Header */}
              <div className="relative bg-dark-700/80 border-b border-cyber-green/15 px-6 py-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-green/8 via-transparent to-cyber-blue/8" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-cyber-green/55 mb-2">
                      Project Case Study
                    </p>
                    <h3 className="font-mono text-base sm:text-lg font-semibold text-foreground group-hover:text-cyber-green transition-colors leading-snug">
                      {project.title}
                    </h3>
                  </div>
                  <div className="font-mono text-xs text-cyber-green/50 bg-dark-900/80 px-2 py-1 rounded border border-cyber-green/20 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <p className="font-mono text-sm text-foreground/60 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2 py-1 bg-cyber-green/5 border border-cyber-green/20 text-cyber-green/80 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-cyber-green/10 flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-dark-800 border border-cyber-green/30 rounded-lg text-cyber-green hover:bg-cyber-green hover:text-dark-900 transition-all text-xs font-mono"
                    aria-label="View on GitHub"
                  >
                    <FaGithub size={14} />
                    Source
                  </a>
                  {project.demo && project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-dark-800 border border-cyber-blue/30 rounded-lg text-cyber-blue hover:bg-cyber-blue hover:text-dark-900 transition-all text-xs font-mono"
                      aria-label="View demo"
                    >
                      <FaExternalLinkAlt size={12} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-cyber-green via-cyber-blue to-cyber-red transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
