"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  const phases = [
    "Initializing system...",
    "Loading kernel modules...",
    "Establishing secure connection...",
    "Decrypting data streams...",
    "Bypassing firewall... [AUTHORIZED]",
    "Loading portfolio assets...",
    "SYSTEM ACCESS GRANTED",
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress < 100) {
      const phaseIndex = Math.min(
        Math.floor((progress / 100) * phases.length),
        phases.length - 1
      );
      setPhase(phaseIndex);
    }
  }, [progress, phases.length]);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {progress <= 100 && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-xl px-6">
            {/* ASCII Art Header */}
            <pre className="text-cyber-green text-xs sm:text-sm font-mono mb-8 text-center leading-tight">
{`
 ██████╗ ██╗  ██╗ ██████╗ ███████╗████████╗
██╔════╝ ██║  ██║██╔═══██╗██╔════╝╚══██╔══╝
██║  ███╗███████║██║   ██║███████╗   ██║   
██║   ██║██╔══██║██║   ██║╚════██║   ██║   
╚██████╔╝██║  ██║╚██████╔╝███████║   ██║   
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝   
`}
            </pre>

            {/* Terminal-style log messages */}
            <div className="font-mono text-sm mb-6 space-y-1">
              {phases.slice(0, phase + 1).map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${
                    i === phases.length - 1 && phase === phases.length - 1
                      ? "text-cyber-green font-bold text-lg neon-green-glow"
                      : "text-cyber-green/70"
                  }`}
                >
                  <span className="text-cyber-blue">root@system:~$</span> {text}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-dark-800 border border-cyber-green/30 rounded-sm overflow-hidden h-4 mb-2">
              <motion.div
                className="h-full bg-gradient-to-r from-cyber-green to-cyber-blue"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
                style={{
                  boxShadow: "0 0 10px #00ff41, 0 0 20px #00ff41",
                }}
              />
            </div>

            <div className="flex justify-between font-mono text-xs text-cyber-green/60">
              <span>Loading...</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
