import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const USERNAME = process.env.CREDLY_USERNAME || "nidhal-el-kebir";
const OUT_JSON = path.join(process.cwd(), "src", "data", "credly-badges.json");
const IMG_DIR = path.join(process.cwd(), "public", "certs", "credly");

const ISSUER_ALIASES = {
  "Amazon Web Services Training and Certification": "AWS",
  "Cisco Networking Academy": "Cisco",
};

const shortIssuer = (name) => ISSUER_ALIASES[name] ?? name;

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function fetchPage(page) {
  const url = `https://www.credly.com/users/${USERNAME}/badges?sort=-state_updated_at&page=${page}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Credly responded ${res.status}`);
  return res.json();
}

async function downloadImage(url, slug) {
  const ext = (new URL(url).pathname.match(/\.(png|jpe?g|svg|webp)$/i) || [".png"])[0];
  const file = `${slug}${ext.toLowerCase()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`image ${res.status}`);
  await writeFile(path.join(IMG_DIR, file), Buffer.from(await res.arrayBuffer()));
  return `/certs/credly/${file}`;
}

async function main() {
  await mkdir(IMG_DIR, { recursive: true });

  const badges = [];
  let page = 1;
  let totalPages = 1;
  do {
    const { data, metadata } = await fetchPage(page);
    badges.push(...data);
    totalPages = metadata?.total_pages ?? 1;
    page += 1;
  } while (page <= totalPages);

  const mapped = [];
  for (const badge of badges) {
    const tpl = badge.badge_template;
    const slug = slugify(tpl.name);
    const remoteImage = tpl.image?.url || tpl.image_url;

    let image = remoteImage;
    try {
      image = await downloadImage(remoteImage, slug);
    } catch {
      console.warn(`[credly] kept remote image for "${tpl.name}"`);
    }

    const entities = badge.issuer?.entities ?? [];
    const primary = entities.find((e) => e.primary) ?? entities[0];
    const authorizedBy = entities.find((e) => !e.primary && e.entity?.name !== primary?.entity?.name);

    mapped.push({
      id: badge.id,
      title: tpl.name,
      issuer: shortIssuer(primary?.entity?.name ?? "Credly"),
      authorizedBy: authorizedBy?.entity?.name ? shortIssuer(authorizedBy.entity.name) : null,
      date: badge.issued_at_date,
      level: tpl.level ?? null,
      description: tpl.description ?? "",
      // PWID-* entries are Credly's internal product ids, not real skills
      skills: (tpl.skills ?? []).map((s) => s.name).filter((n) => !/^PWID-/i.test(n)),
      image,
      credentialUrl: `https://www.credly.com/badges/${badge.id}/public_url`,
    });
  }

  mapped.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  await writeFile(OUT_JSON, `${JSON.stringify(mapped, null, 2)}\n`);
  console.log(`[credly] wrote ${mapped.length} badges to src/data/credly-badges.json`);
}

main().catch(async (err) => {
  console.warn(`[credly] fetch failed (${err.message}) — using previously cached badges`);
  try {
    await readFile(OUT_JSON);
  } catch {
    await writeFile(OUT_JSON, "[]\n");
  }
});
