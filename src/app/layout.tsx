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
  title: "Nidhal El Kebir | Cybersecurity Engineer",
  description:
    "Cybersecurity engineering student specializing in penetration testing, vulnerability assessment, and network security. 34 verified certifications from Cisco, IBM, Fortinet, and AWS.",
  icons: {
    icon: "/skull.svg",
  },
  keywords: [
    "cybersecurity",
    "penetration testing",
    "vulnerability assessment",
    "network security",
    "security analyst",
    "information security",
    "Nidhal El Kebir",
  ],
  authors: [{ name: "Nidhal El Kebir" }],
  openGraph: {
    title: "Nidhal El Kebir | Cybersecurity Engineer",
    description:
      "Penetration testing, vulnerability assessment, and network security. 34 verified certifications from Cisco, IBM, Fortinet, and AWS.",
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
