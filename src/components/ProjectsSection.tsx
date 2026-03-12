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
              className="group relative bg-dark-800/60 border border-cyber-green/10 rounded-lg overflow-hidden hover:border-cyber-green/30 hover:shadow-[0_0_20px_rgba(0,255,65,0.1)] transition-all duration-500"
            >
              {/* Project Icon */}
              <div className="relative h-32 bg-dark-700 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/5 via-transparent to-cyber-blue/5 flex items-center justify-center">
                  <span className="text-5xl group-hover:scale-125 transition-transform duration-500">👻</span>
                </div>

                {/* Top-right index */}
                <div className="absolute top-3 right-3 font-mono text-xs text-cyber-green/40 bg-dark-900/80 px-2 py-1 rounded">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Hover overlay with links */}
                <div className="absolute inset-0 bg-dark-900/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-dark-800 border border-cyber-green/30 rounded-lg text-cyber-green hover:bg-cyber-green hover:text-dark-900 transition-all"
                    aria-label="View on GitHub"
                  >
                    <FaGithub size={20} />
                  </a>
                  {project.demo && project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-dark-800 border border-cyber-blue/30 rounded-lg text-cyber-blue hover:bg-cyber-blue hover:text-dark-900 transition-all"
                      aria-label="View demo"
                    >
                      <FaExternalLinkAlt size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="font-mono text-lg font-bold text-foreground group-hover:text-cyber-green transition-colors mb-3">
                  <span className="text-cyber-green/50">&gt; </span>
                  {project.title}
                </h3>

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
              </div>

              {/* Bottom accent line */}
              <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-cyber-green to-cyber-blue transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
