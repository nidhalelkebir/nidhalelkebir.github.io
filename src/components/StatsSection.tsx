"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { stats } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";

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

    let frame = 0;
    const duration = 1600;
    const totalFrames = Math.round(duration / 16);

    const timer = setInterval(() => {
      frame += 1;
      // easeOutExpo — fast start, soft landing
      const progress = frame / totalFrames;
      const eased = progress >= 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(end * eased));
      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, inView]);

  return (
    <span className="font-mono text-4xl sm:text-5xl font-bold tracking-tight">
      <span className="holo-text">{count}</span>
      <span className="text-cyber-green">{suffix}</span>
    </span>
  );
}

export default function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Telemetry"
          title="By the Numbers"
          inView={inView}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard
                max={7}
                className="section-shell glass-edge relative overflow-hidden rounded-xl p-5 sm:p-6"
              >
                <div className="scan-sweep" />
                <div className="tilt-layer relative">
                  <div className="mb-4 h-[2px] w-10 rounded bg-white/20" />
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} inView={inView} />
                  <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-foreground/45">
                    {stat.label}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
