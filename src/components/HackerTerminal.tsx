"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { terminalCommands } from "@/data/portfolio";

interface TerminalLine {
  type: "input" | "output";
  content: string;
}

export default function HackerTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: 'Welcome to CyberPortfolio v1.0.0' },
    { type: "output", content: 'Type "help" to see available commands.\n' },
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
          <div className="text-center mb-8">
            <h2 className="font-mono text-2xl sm:text-3xl text-foreground mb-2">
              <span className="text-cyber-green">&gt;</span> Interactive Terminal
            </h2>
            <p className="text-foreground/50 font-mono text-sm">
              Try typing &quot;help&quot; to explore
            </p>
          </div>

          {/* Terminal window */}
          <div className="border border-cyber-green/30 rounded-lg overflow-hidden shadow-2xl">
            {/* Title bar */}
            <div className="bg-dark-700 px-4 py-2 flex items-center justify-between border-b border-cyber-green/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-cyber-red" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-cyber-green" />
              </div>
              <span className="font-mono text-xs text-foreground/50">
                root@ghost:~
              </span>
              <div className="w-16" />
            </div>

            {/* Terminal body */}
            <div
              ref={terminalRef}
              className="bg-dark-900/95 p-4 h-80 sm:h-96 overflow-y-auto font-mono text-sm cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => (
                <div key={i} className="mb-1">
                  {line.type === "input" ? (
                    <div>
                      <span className="text-cyber-blue">visitor@ghost</span>
                      <span className="text-foreground/50">:</span>
                      <span className="text-cyber-purple">~</span>
                      <span className="text-foreground/50">$ </span>
                      <span className="text-foreground">{line.content}</span>
                    </div>
                  ) : (
                    <pre className="text-cyber-green/80 whitespace-pre-wrap break-words">
                      {line.content}
                    </pre>
                  )}
                </div>
              ))}

              {/* Current input line */}
              <div className="flex items-center">
                <span className="text-cyber-blue">visitor@ghost</span>
                <span className="text-foreground/50">:</span>
                <span className="text-cyber-purple">~</span>
                <span className="text-foreground/50">$ </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-foreground font-mono text-sm caret-cyber-green"
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
