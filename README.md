# 🛡️ Cybersecurity Portfolio

A modern, fully responsive portfolio website built for Cybersecurity Engineering students with a hacker-style aesthetic that remains professional for recruiters.

## ⚡ Features

- **Matrix Rain Background** — Animated canvas-based Matrix-style falling characters
- **Hacking Loading Screen** — Terminal-style boot sequence with "SYSTEM ACCESS GRANTED"
- **Interactive Terminal** — Type commands (`help`, `about`, `skills`, `certs`, `projects`, `contact`) to explore
- **Typing Animation** — Auto-cycling role descriptions on the hero section
- **3D Cyber Globe** — Interactive Three.js globe with orbit controls
- **Animated Stats** — Counter animations for projects, certs, CTF challenges, and years
- **Skills Section** — Animated progress bars organized by category
- **Certifications** — Hover-animated cards with full-detail modal on click
- **Projects** — Cyberpunk-styled cards with GitHub/demo links
- **Contact Form** — Encrypted message animation on submit
- **Sound Effects** — Toggle-able beep sounds using Web Audio API
- **Visual Effects** — Scanline overlay, glitch text, neon glows, CRT flicker
- **SEO Optimized** — Full metadata, Open Graph tags, semantic HTML
- **Fully Responsive** — Mobile-first design with smooth transitions

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS v4
- **Animations:** Framer Motion
- **3D:** Three.js + React Three Fiber + Drei
- **Icons:** React Icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── certs/              # Place certificate images here
│   │   ├── security-plus.png
│   │   ├── ceh.png
│   │   ├── ejpt.png
│   │   └── google-cyber.png
│   ├── projects/           # Place project screenshots here
│   │   ├── vuln-scanner.png
│   │   ├── pentest-framework.png
│   │   ├── siem-dashboard.png
│   │   └── encrypted-chat.png
│   └── cv.pdf              # Place your CV/resume here
├── src/
│   ├── app/
│   │   ├── globals.css     # Global styles, animations, effects
│   │   ├── layout.tsx      # Root layout with SEO metadata
│   │   └── page.tsx        # Main entry point
│   ├── components/
│   │   ├── CertificationsSection.tsx  # Cert cards + modal
│   │   ├── ContactSection.tsx         # Contact form + encryption anim
│   │   ├── CyberGlobe3D.tsx          # Three.js interactive globe
│   │   ├── Footer.tsx                 # Footer with socials
│   │   ├── HackerTerminal.tsx         # Interactive terminal
│   │   ├── HeroSection.tsx            # Landing/hero section
│   │   ├── LoadingScreen.tsx          # Boot sequence loading screen
│   │   ├── MatrixRain.tsx             # Matrix rain canvas
│   │   ├── Navbar.tsx                 # Navigation + sound toggle
│   │   ├── PortfolioClient.tsx        # Main client orchestrator
│   │   ├── ProjectsSection.tsx        # Project cards
│   │   ├── SkillsSection.tsx          # Skills progress bars
│   │   └── StatsSection.tsx           # Animated counters
│   ├── data/
│   │   └── portfolio.ts    # ⭐ ALL PORTFOLIO DATA — Edit this file!
│   └── hooks/
│       └── useSoundEffects.ts  # Web Audio API sound effects
└── README.md
```

## ✏️ Customization Guide

### 1. Personal Information

Edit **`src/data/portfolio.ts`** — this is the single source of truth for all your data:

```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Cybersecurity Engineering Student",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  cvUrl: "/cv.pdf",
  bio: "Your bio here...",
};
```

### 2. Certifications

Add/edit entries in the `certifications` array in `src/data/portfolio.ts`:

```typescript
{
  id: "cert-1",
  title: "CompTIA Security+",
  issuer: "CompTIA",
  date: "2025",
  description: "Description of the certification...",
  image: "/certs/security-plus.png",  // Place image in public/certs/
  credentialUrl: "https://verify-url.com",
}
```

### 3. Projects

Add/edit entries in the `projects` array:

```typescript
{
  id: "proj-1",
  title: "Project Name",
  description: "What the project does...",
  technologies: ["Python", "Nmap", "Docker"],
  github: "https://github.com/...",
  demo: "https://demo-url.com",
  image: "/projects/screenshot.png",  // Place in public/projects/
}
```

### 4. Skills

Modify the `skills` array. Each skill has a name, level (0-100), and category:

```typescript
{ name: "Python", level: 90, category: "Languages" }
```

Categories: `"Languages"`, `"Tools"`, `"Systems"`, `"Domains"`

### 5. Statistics

Edit the `stats` array for the animated counters:

```typescript
{ label: "Projects Completed", value: 15, suffix: "+" }
```

### 6. Terminal Commands

Customize responses in the `terminalCommands` object.

### 7. SEO / Metadata

Update `src/app/layout.tsx` with your actual name and details in the `metadata` export.

### 8. Images

- **Certificate images:** Place in `public/certs/`
- **Project screenshots:** Place in `public/projects/`
- **CV/Resume:** Place as `public/cv.pdf`

All images have fallback placeholders, so the site works without them.

## 🎨 Theme Customization

Colors are defined in `src/app/globals.css` under the `@theme inline` block:

| Variable | Default | Purpose |
|----------|---------|---------|
| `--color-cyber-green` | `#00ff41` | Primary neon green |
| `--color-cyber-blue` | `#00d4ff` | Secondary neon blue |
| `--color-cyber-red` | `#ff0040` | Accent red |
| `--color-cyber-purple` | `#bd00ff` | Purple accent |
| `--color-dark-900` | `#0a0a0a` | Darkest background |

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
