import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nidhal El Kebir | Cybersecurity Portfolio",
  description:
    "Portfolio of a Cybersecurity Engineering student specializing in penetration testing, ethical hacking, and security research. View projects, certifications, and skills.",
  icons: {
    icon: "/skull.svg",
  },
  keywords: [
    "cybersecurity",
    "ethical hacking",
    "penetration testing",
    "security researcher",
    "portfolio",
    "CTF",
    "infosec",
  ],
  authors: [{ name: "Nidhal El Kebir" }],
  openGraph: {
    title: "Nidhal El Kebir | Cybersecurity Portfolio",
    description:
      "Portfolio of a Cybersecurity Engineering student specializing in penetration testing, ethical hacking, and security research.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-900 text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
