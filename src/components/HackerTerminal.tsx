"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { terminalCommands } from "@/data/portfolio";

interface TerminalLine {
  type: "input" | "output";
  content: string;
}

export default function HackerTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "ghost shell — Nidhal El Kebir // security profile" },
    { type: "output", content: 'Type "help" to list available commands.\n' },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", content: cmd },
    ];

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    if (trimmed === "") {
      setLines(newLines);
      return;
    }

    const response = terminalCommands[trimmed];
    if (response) {
      newLines.push({ type: "output", content: response });
    } else {
      newLines.push({
        type: "output",
        content: `bash: ${trimmed}: command not found. Type "help" for available commands.`,
      });
    }

    setLines(newLines);
    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = Object.keys(terminalCommands);
      const match = commands.find((c) => c.startsWith(currentInput.toLowerCase()));
      if (match) setCurrentInput(match);
    }
  };

  return (
    <section id="terminal" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-cyber-blue " />
              <span className="eyebrow font-mono">ghost shell</span>
            </div>
            <h2 className="mt-5 font-mono text-3xl sm:text-4xl font-bold tracking-tight">
              <span className="holo-text">Query My Profile</span>
            </h2>
            <p className="mt-3 font-mono text-sm text-foreground/45">
              Type <span className="text-cyber-blue">help</span> — certifications, skills, and
              experience straight from the live data.
            </p>
          </div>

          {/* Terminal window */}
          <div className="section-shell overflow-hidden rounded-xl">
            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.03] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-cyber-red/80" />
                <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                <div className="h-3 w-3 rounded-full bg-cyber-green/80" />
              </div>
              <span className="flex items-center gap-2 font-mono text-xs text-foreground/45">
                <Image src="/skull.svg" alt="" width={14} height={14} className="opacity-70" />
                ghost@nidhal:~
              </span>
              <div className="w-16" />
            </div>

            {/* Terminal body */}
            <div
              ref={terminalRef}
              className="h-80 cursor-text overflow-y-auto bg-[#0b0c0e] p-4 font-mono text-sm sm:h-96"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => (
                <div key={i} className="mb-1">
                  {line.type === "input" ? (
                    <div>
                      <span className="text-cyber-green">ghost@nidhal</span>
                      <span className="text-foreground/50">:</span>
                      <span className="text-foreground/40">~</span>
                      <span className="text-foreground/50">$ </span>
                      <span className="text-foreground">{line.content}</span>
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap break-words text-foreground/60">
                      {line.content}
                    </pre>
                  )}
                </div>
              ))}

              {/* Current input line */}
              <div className="flex items-center">
                <span className="text-cyber-green">ghost@nidhal</span>
                <span className="text-foreground/50">:</span>
                <span className="text-foreground/40">~</span>
                <span className="text-foreground/50">$ </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-foreground font-mono text-sm caret-white"
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
