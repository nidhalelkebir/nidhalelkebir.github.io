"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { personalInfo } from "@/data/portfolio";
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane } from "react-icons/fa";

const WEB3FORMS_ACCESS_KEY = "ca995fb6-4f80-404f-bbab-03668c6595e8";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [encryptionAnim, setEncryptionAnim] = useState<string[]>([]);
  const [error, setError] = useState("");
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");

    // Encryption animation
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const steps: string[] = [];
    const original = `FROM: ${formData.name} | MSG: ${formData.message}`;

    for (let i = 0; i < 8; i++) {
      let encrypted = "";
      for (let j = 0; j < Math.min(original.length, 40); j++) {
        if (j < (original.length * i) / 8) {
          encrypted += chars[Math.floor(Math.random() * chars.length)];
        } else {
          encrypted += original[j] || "";
        }
      }
      steps.push(encrypted);
    }
    steps.push("██████████ ENCRYPTED ██████████");

    for (const step of steps) {
      setEncryptionAnim((prev) => [...prev, step]);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    // Send the message directly to Web3Forms
    try {
      const payload = new FormData();
      payload.append("access_key", WEB3FORMS_ACCESS_KEY);
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("message", formData.message);
      payload.append("subject", `Portfolio Contact: ${formData.name}`);
      payload.append("from_name", formData.name);
      payload.append("reply_to", formData.email);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSent(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError(data.message || "Failed to send message. Please try emailing directly.");
      }
    } catch {
      setError("Network error. Please try emailing directly.");
    }

    setSending(false);

    setTimeout(() => {
      setSent(false);
      setError("");
      setEncryptionAnim([]);
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 px-4" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-cyber-blue text-sm mb-2">
            $ secure-connect --profile contact
          </p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-foreground">
            <span className="text-cyber-green">&gt;</span> Get In Touch
          </h2>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-cyber-green/50 to-transparent mt-4 max-w-xs mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="font-mono text-sm text-foreground/70 leading-relaxed">
              Interested in collaborating on cybersecurity projects, discussing
              security research, or just want to connect? Feel free to reach out
              through any of these channels.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center space-x-4 p-4 section-shell rounded-xl hover:border-cyber-green/35 transition-all group"
              >
                <FaEnvelope className="text-cyber-green text-xl group-hover:neon-green-glow" />
                <div>
                  <p className="font-mono text-xs text-cyber-blue">Email</p>
                  <p className="font-mono text-sm text-foreground/80">
                    {personalInfo.email}
                  </p>
                </div>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 section-shell rounded-xl hover:border-cyber-green/35 transition-all group"
              >
                <FaGithub className="text-cyber-green text-xl group-hover:neon-green-glow" />
                <div>
                  <p className="font-mono text-xs text-cyber-blue">GitHub</p>
                  <p className="font-mono text-sm text-foreground/80">
                    {personalInfo.github}
                  </p>
                </div>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 section-shell rounded-xl hover:border-cyber-green/35 transition-all group"
              >
                <FaLinkedin className="text-cyber-blue text-xl" />
                <div>
                  <p className="font-mono text-xs text-cyber-blue">LinkedIn</p>
                  <p className="font-mono text-sm text-foreground/80">
                    {personalInfo.linkedin}
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 section-shell p-5 sm:p-6 rounded-xl">
              <div>
                <label className="font-mono text-xs text-cyber-blue block mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full bg-dark-900/55 border border-cyber-green/20 rounded-lg px-4 py-3 font-mono text-sm text-foreground focus:border-cyber-green focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-cyber-blue block mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full bg-dark-900/55 border border-cyber-green/20 rounded-lg px-4 py-3 font-mono text-sm text-foreground focus:border-cyber-green focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-cyber-blue block mb-1">
                  Message:
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  rows={5}
                  className="w-full bg-dark-900/55 border border-cyber-green/20 rounded-lg px-4 py-3 font-mono text-sm text-foreground focus:border-cyber-green focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 px-6 font-mono text-sm border border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-dark-900 transition-all duration-300 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPaperPlane />
                <span>{sending ? "Sending securely..." : "[ Send Message ]"}</span>
              </button>
            </form>

            {/* Encryption animation */}
            <AnimatePresence>
              {encryptionAnim.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-dark-800/80 border border-cyber-green/20 rounded overflow-hidden"
                >
                  <p className="font-mono text-xs text-cyber-blue mb-2">
                    Encrypting message...
                  </p>
                  {encryptionAnim.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`font-mono text-xs break-all ${
                        i === encryptionAnim.length - 1
                          ? "text-cyber-green font-bold"
                          : "text-cyber-green/40"
                      }`}
                    >
                      {line}
                    </motion.p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success message */}
            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 bg-cyber-green/10 border border-cyber-green/30 rounded text-center"
                >
                  <p className="font-mono text-sm text-cyber-green">
                    ✓ Message encrypted and sent successfully!
                  </p>
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 bg-cyber-red/10 border border-cyber-red/30 rounded text-center"
                >
                  <p className="font-mono text-sm text-cyber-red">
                    ✗ {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
