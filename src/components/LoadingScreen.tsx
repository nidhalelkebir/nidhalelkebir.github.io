"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const phases = [
  "Establishing secure channel",
  "Verifying credential chain",
  "Syncing Credly badge registry",
  "Mapping threat topology",
  "Calibrating holographic layer",
  "Access granted",
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2.5;
      });
    }, 32);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  const phase = Math.min(Math.floor((progress / 100) * phases.length), phases.length - 1);
  const done = progress >= 100;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05060a]"
        exit={{ opacity: 0, filter: "blur(12px)" }}
        transition={{ duration: 0.6 }}
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,229,255,0.14),transparent_60%)]" />

        <div className="relative w-full max-w-md px-6">
          {/* Rotating holo shield */}
          <div className="relative mx-auto mb-10 h-28 w-28">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-cyan-400/25 border-t-cyan-400 border-r-violet-500"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-3 rounded-full border border-violet-500/25 border-b-violet-400"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.06, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className=""
              >
                <Image src="/skull.svg" alt="Ghost mark" width={44} height={44} priority />
              </motion.div>
            </div>
          </div>

          {/* Current phase */}
          <div className="mb-5 h-6 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className={`font-mono text-xs uppercase tracking-[0.24em] ${
                  done ? "text-cyber-green" : "text-foreground/50"
                }`}
              >
                {phases[phase]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress rail */}
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.07]">
            <motion.div
              className="h-full rounded-full bg-foreground/80"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.15 }}
              
            />
          </div>

          <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
            <span>Booting</span>
            <span>{Math.min(Math.round(progress), 100)}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
