"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "@/data/portfolio";

const categories = ["Languages", "Tools", "Systems", "Domains"];

const categoryIcons: Record<string, string> = {
  Languages: "{ }",
  Tools: "[#]",
  Systems: "$ _",
  Domains: "[SEC]",
};

export default function SkillsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="skills" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-cyber-blue text-sm mb-2">
            $ cat skills.json
          </p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-foreground">
            <span className="text-cyber-green">&lt;</span>
            Technical Skills
            <span className="text-cyber-green">/&gt;</span>
          </h2>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-cyber-green/50 to-transparent mt-4 max-w-xs mx-auto" />
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              className="bg-dark-800/50 border border-cyber-green/10 rounded-lg p-6 hover:border-cyber-green/30 hover:shadow-[0_0_18px_rgba(0,255,65,0.08)] transition-all duration-300"
            >
              {/* Category header */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-cyber-green font-mono text-xl">
                  {categoryIcons[category]}
                </span>
                <h3 className="font-mono text-lg text-cyber-blue font-semibold">
                  {category}
                </h3>
              </div>

              {/* Skills in this category */}
              <div className="space-y-4">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="font-mono text-sm text-foreground/80">
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs text-cyber-green">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-dark-900 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{
                            duration: 1.2,
                            delay: catIndex * 0.15 + skillIndex * 0.1,
                            ease: "easeOut",
                          }}
                          style={{
                            background: `linear-gradient(90deg, #00ff41, #00d4ff)`,
                            boxShadow: "0 0 8px rgba(0, 255, 65, 0.4)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
