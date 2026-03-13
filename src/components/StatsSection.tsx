"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { stats } from "@/data/portfolio";

function AnimatedCounter({
  end,
  suffix,
  inView,
}: {
  end: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, inView]);

  return (
    <span className="text-3xl sm:text-4xl md:text-5xl font-semibold font-mono tracking-tight text-foreground">
      {count}
      <span className="text-cyber-green">{suffix}</span>
    </span>
  );
}

export default function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-cyber-blue text-sm mb-2">$ cat impact/metrics.json</p>
          <h2 className="font-mono text-2xl sm:text-3xl font-semibold text-foreground">
            Professional Metrics
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative p-5 sm:p-6 section-shell hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="h-[2px] w-12 bg-gradient-to-r from-cyber-green/80 to-cyber-blue/70 rounded mb-4" />
              <AnimatedCounter
                end={stat.value}
                suffix={stat.suffix}
                inView={inView}
              />
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground/55 mt-3 leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
