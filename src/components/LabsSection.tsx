"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { labs, type Lab } from "@/data/portfolio";
import { FaPlay, FaTimes, FaFileAlt, FaLock } from "react-icons/fa";
import SectionHeading from "@/components/SectionHeading";

/** Accepts watch, youtu.be, shorts, and embed URLs. */
function youtubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /[?&]v=([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /\/embed\/([\w-]{11})/,
    /\/shorts\/([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function LabsSection() {
  const [active, setActive] = useState<Lab | null>(null);
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  if (labs.length === 0) return null;

  const activeId = active ? youtubeId(active.videoUrl) : null;

  return (
    <section id="labs" className="py-20 px-4" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Recorded walkthroughs"
          title="Labs"
          subtitle="Full walkthroughs on intentionally vulnerable machines I host myself — recon through root, narrated end to end."
          inView={inView}
        />

        <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {labs.map((lab, index) => {
            const videoId = youtubeId(lab.videoUrl);

            return (
              <motion.article
                key={lab.id}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-5 py-7 md:grid-cols-[240px_1fr] md:gap-8"
              >
                {/* Thumbnail / placeholder */}
                <button
                  type="button"
                  onClick={() => videoId && setActive(lab)}
                  disabled={!videoId}
                  aria-label={videoId ? `Play ${lab.title}` : `${lab.title} — recording pending`}
                  className={`group relative aspect-video w-full overflow-hidden rounded-lg border border-white/[0.07] bg-[#101215] ${
                    videoId ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  {videoId ? (
                    <>
                      <Image
                        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                        alt=""
                        fill
                        sizes="240px"
                        className="object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                      />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/60 text-foreground backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
                          <FaPlay size={12} className="ml-0.5" />
                        </span>
                      </span>
                    </>
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src="/skull.svg"
                        alt=""
                        width={38}
                        height={38}
                        className="opacity-40"
                      />
                    </span>
                  )}
                </button>

                {/* Detail */}
                <div className="self-center">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-foreground/35">
                    <span>{lab.platform}</span>
                    <span aria-hidden>·</span>
                    <span>{lab.difficulty}</span>
                    <span aria-hidden>·</span>
                    <span>{lab.date}</span>
                    {lab.duration !== "—" && (
                      <>
                        <span aria-hidden>·</span>
                        <span>{lab.duration}</span>
                      </>
                    )}
                  </div>

                  <h3 className="mt-2 font-mono text-lg font-semibold text-foreground">
                    {lab.title}
                  </h3>

                  <p className="mt-2.5 max-w-2xl font-mono text-sm leading-relaxed text-foreground/55">
                    {lab.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {lab.techniques.map((technique) => (
                      <span
                        key={technique}
                        className="rounded border border-white/10 px-2 py-0.5 font-mono text-[11px] text-foreground/50"
                      >
                        {technique}
                      </span>
                    ))}
                    {lab.writeupUrl && (
                      <a
                        href={lab.writeupUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 inline-flex items-center gap-1.5 font-mono text-[11px] text-foreground/60 underline decoration-white/20 underline-offset-4 transition-colors hover:text-foreground"
                      >
                        <FaFileAlt size={10} />
                        Written report
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Scope note — signals you test only what you are allowed to test */}
        <p className="mt-8 flex items-start gap-2 font-mono text-[11px] leading-relaxed text-foreground/30">
          <FaLock size={10} className="mt-0.5 shrink-0" />
          All targets are intentionally vulnerable machines running in my own isolated lab. No
          system is tested without explicit authorisation.
        </p>
      </div>

      {/* Player */}
      <AnimatePresence>
        {active && activeId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          >
            <motion.div
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-mono text-sm text-foreground">{active.title}</h3>
                  <p className="mt-1 font-mono text-[11px] text-foreground/40">
                    {active.platform} · {active.difficulty}
                  </p>
                </div>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close player"
                  className="p-1 text-foreground/50 transition-colors hover:text-foreground"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeId}?autoplay=1&rel=0`}
                  title={active.title}
                  allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
