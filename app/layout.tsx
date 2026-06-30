import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import FloatingChat from "@/components/FloatingChat";
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
  title: "Himanshu Sharma — Technical Specialist & AI Builder",
  description:
    "Technical Specialist supporting live NHL broadcasts with 99.97% uptime. Founder of The KPI Hub. Builder of autonomous AI systems, self-hosted infrastructure, and production-grade SaaS.",
  keywords: [
    "Live Broadcasting",
    "NHL Broadcast Engineer",
    "AWS MediaLive",
    "AI Systems Builder",
    "SaaS Founder",
    "Platform Engineering",
    "Next.js",
    "Self-hosted AI",
  ],
  authors: [{ name: "Himanshu Sharma" }],
  openGraph: {
    title: "Himanshu Sharma — Technical Specialist & AI Builder",
    description:
      "Technical Specialist supporting live NHL broadcasts with 99.97% uptime. Founder of The KPI Hub. Builder of autonomous AI systems and production-grade SaaS.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">
        {children}
        <FloatingChat />
      </body>
    </html>
  );
}
