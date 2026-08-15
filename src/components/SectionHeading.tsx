"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  inView,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  inView: boolean;
  children?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      <p className="eyebrow font-mono">{eyebrow}</p>

      <h2 className="mt-3 font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-foreground/45">
          {subtitle}
        </p>
      )}

      {children}
    </motion.div>
  );
}
