import type { Certification } from "./portfolio";

/**
 * Ranks Credly badges by how much weight they carry with a security recruiter,
 * so the strongest credentials lead regardless of when they were issued.
 *
 * The score is derived entirely from badge attributes — no per-badge list to
 * maintain — so anything new synced from Credly is ranked automatically.
 */

/** Credential type, read from the badge title. First match wins, so order matters. */
const CREDENTIAL_RULES: Array<[RegExp, number]> = [
  // Career-prep and event badges are achievements, not technical credentials
  [/job search|resume|interview|careers/i, -60],
  [/learn-?a-?thon|hackathon|webinar|attendee|participant/i, -25],

  // Recognised industry credentials
  [/professional certificate/i, 55],
  [/^ccna\b/i, 50],
  [/ethical hacker/i, 42],
  [/career path/i, 38],
  [/certified associate|certified in cybersecurity|^fortinet certified/i, 34],
  [/\boperator\b|\badministrator\b|\bspecialist\b|\banalyst\b/i, 30],
  [/exam readiness|exam prep/i, 12],

  // Entry-level course badges
  [/introduction to|^intro\b|basics|overview|fundamentals/i, -18],
  [/essentials/i, -10],
];

const LEVEL_WEIGHT: Record<string, number> = {
  Advanced: 26,
  Intermediate: 16,
  Foundational: 6,
};

const ISSUER_WEIGHT: Record<string, number> = {
  Cisco: 12,
  IBM: 12,
  Google: 12,
  Fortinet: 10,
  AWS: 8,
  Microsoft: 12,
  CompTIA: 14,
  "Offensive Security": 16,
};

/** Terms that signal hands-on security depth rather than general awareness. */
const CORE_DOMAIN = [
  "penetration test",
  "pentest",
  "ethical hacking",
  "offensive",
  "threat hunting",
  "incident response",
  "forensic",
  "malware",
  "siem",
  "firewall",
  "network security",
  "network defense",
  "endpoint",
  "vulnerability",
  "cryptography",
  "threat management",
  "threat intelligence",
  "exploit",
  "reverse engineering",
  "intrusion",
];

/** Topics that are adjacent rather than core to a security role. */
const TANGENTIAL = [/generative ai/i, /job search|resume|interview/i, /soft skill/i];

/** Coursera and similar are delivery platforms — credit the authoring body. */
const PLATFORMS = /^(coursera|edx|udemy|linkedin learning|credly)$/i;

function effectiveIssuer(cert: Certification): string {
  if (!PLATFORMS.test(cert.issuer)) return cert.issuer;
  if (cert.authorizedBy) return cert.authorizedBy;
  // Fall back to a well-known name mentioned in the title (e.g. "Google Cybersecurity…")
  const fromTitle = Object.keys(ISSUER_WEIGHT).find((name) =>
    new RegExp(`\\b${name}\\b`, "i").test(cert.title)
  );
  return fromTitle ?? cert.issuer;
}

export function scoreCertification(cert: Certification): number {
  let score = 0;

  // 1. Credential type
  const rule = CREDENTIAL_RULES.find(([pattern]) => pattern.test(cert.title));
  score += rule ? rule[1] : 20;

  // 2. Stated difficulty
  score += cert.level ? (LEVEL_WEIGHT[cert.level] ?? 12) : 12;

  // 3. Issuing authority
  score += ISSUER_WEIGHT[effectiveIssuer(cert)] ?? 4;

  // 4. Core-domain relevance, capped so a long skill list cannot dominate
  const haystack = `${cert.title} ${cert.skills.join(" ")}`.toLowerCase();
  const hits = CORE_DOMAIN.filter((term) => haystack.includes(term)).length;
  score += Math.min(hits * 6, 24);

  if (TANGENTIAL.some((pattern) => pattern.test(cert.title))) score -= 10;

  // 5. Breadth of covered skills as a proxy for course depth
  score += Math.min(cert.skills.length, 20) * 0.8;

  return Math.round(score * 10) / 10;
}

/** Most important first; ties broken by most recent. */
export function rankCertifications(certs: Certification[]): Certification[] {
  return [...certs].sort((a, b) => {
    const diff = scoreCertification(b) - scoreCertification(a);
    if (diff !== 0) return diff;
    return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
  });
}

/** Newest first. */
export function sortByDate(certs: Certification[]): Certification[] {
  return [...certs].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
