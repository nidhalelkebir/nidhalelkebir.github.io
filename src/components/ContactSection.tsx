"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { personalInfo } from "@/data/portfolio";
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import SectionHeading from "@/components/SectionHeading";

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
        <SectionHeading
          eyebrow="Secure channel"
          title="Get In Touch"
          subtitle="Open to cybersecurity internships, collaborations, and CTF teams."
          inView={inView}
        />

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
                className="group flex items-center gap-4 rounded-xl p-4 section-shell transition-colors"
              >
                <FaEnvelope className="text-lg text-foreground/50 transition-colors group-hover:text-foreground" />
                <div>
                  <p className="font-mono text-xs text-foreground/40">Email</p>
                  <p className="font-mono text-sm text-foreground/80">
                    {personalInfo.email}
                  </p>
                </div>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl p-4 section-shell transition-colors"
              >
                <FaGithub className="text-lg text-foreground/50 transition-colors group-hover:text-foreground" />
                <div>
                  <p className="font-mono text-xs text-foreground/40">GitHub</p>
                  <p className="font-mono text-sm text-foreground/80">
                    {personalInfo.github}
                  </p>
                </div>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl p-4 section-shell transition-colors"
              >
                <FaLinkedin className="text-lg text-foreground/50" />
                <div>
                  <p className="font-mono text-xs text-foreground/40">LinkedIn</p>
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
                <label className="mb-1.5 block font-mono text-xs text-foreground/50">
                  Name:
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground/25 transition-all focus:border-white/30 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-xs text-foreground/50">
                  Email:
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground/25 transition-all focus:border-white/30 focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-xs text-foreground/50">
                  Message:
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  rows={5}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground/25 transition-all focus:border-white/30 focus:outline-none resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-6 py-3 font-mono text-sm text-[#0b0c0e] transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaPaperPlane />
                <span>{sending ? "Sending securely..." : "Send secure message"}</span>
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
