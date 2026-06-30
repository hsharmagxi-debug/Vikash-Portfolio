"use client";

import { motion } from "framer-motion";

const EXPERIENCE = [
  {
    period: "2025 – Present",
    role: "Technical Specialist – Broadcasting & Streaming",
    company: "GlobalXperts (NHL Project)",
    location: "Delhi-NCR, India",
    type: "Full-time",
    bullets: [
      "Delivered reliable live production support for NHL broadcasts across 16 simultaneous feeds with 99.97% uptime, including Stanley Cup Finals Game 7 with zero feed drops or escalations.",
      "Handle real-time monitoring, incident management in ServiceNow, and rapid troubleshooting for live streaming infrastructure.",
      "Work with AWS MediaLive, MediaPackage, SRT/RTMP low-latency protocols, and VTOC systems.",
      "Maintain 100% compliance on pre/post-game checklists and detailed activity logging.",
      "Support NHL Innovation Lab testing and integrations.",
    ],
    tags: ["AWS MediaLive", "MediaPackage", "SRT/RTMP", "VTOC", "ServiceNow", "Live Monitoring"],
  },
  {
    period: "2025 – Present",
    role: "Founder & CEO",
    company: "The KPI Hub",
    location: "Delhi-NCR, India",
    type: "Founder",
    bullets: [
      "Building a high-trust B2B SaaS intelligence platform delivering real-time category intelligence (funding, launches, pricing, hiring) via AI-synthesized daily briefs.",
      "Tech Stack: Next.js 15, TypeScript, Tailwind, Supabase (with RLS), Claude 3.5 Sonnet.",
      "Leading product development, automation pipelines, content intelligence systems, and go-to-market strategy.",
      "Selected as India's Top 300 Builders at VibeCon 2025 (YC × Anthropic × Lightspeed × Razorpay).",
    ],
    tags: ["Next.js 15", "TypeScript", "Supabase", "Claude", "SaaS", "AI Pipelines"],
  },
  {
    period: "~2019 – 2025",
    role: "AV Systems & Enterprise Network Specialist",
    company: "Various Clients",
    location: "Delhi-NCR, India",
    type: "Full-time",
    bullets: [
      "5+ years of AV systems design, installation, and commissioning for enterprise clients — conference rooms, broadcast control rooms, and large-venue deployments.",
      "Worked with Q-SYS, Crestron, and AMX DSP/control systems for audio routing, signal distribution, and room automation.",
      "Designed and implemented enterprise network infrastructure: VLANs (802.1Q trunking), L2/L3 switching, RSTP/MSTP, BPDU Guard, DHCP Snooping, and switch port security.",
      "Delivered SOW documentation, commissioning reports, and red-line drawings for enterprise AV/IT deployments.",
      "Managed HDBaseT and structured cabling infrastructure across multi-floor corporate environments.",
    ],
    tags: ["Q-SYS", "Crestron", "AMX", "HDBaseT", "VLANs", "L2/L3 Switching", "RSTP/MSTP"],
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="bg-zinc-950 py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Career History
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Experience
          </h2>
          <p className="mt-4 text-zinc-400">
            Broadcasting → Enterprise AV/Networking → Live Cloud Infrastructure → SaaS Founder & AI Builder
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-zinc-800" />

          <div className="space-y-12">
            {EXPERIENCE.map((job, i) => (
              <motion.div
                key={`${job.company}-${i}`}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative pl-10"
              >
                {/* Dot */}
                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-cyan-400 -translate-x-0.5" />

                {/* Period */}
                <div className="text-xs font-mono text-zinc-500 mb-2">{job.period}</div>

                {/* Role + company */}
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white">{job.role}</h3>
                  <span className="text-zinc-600">·</span>
                  <span className="text-cyan-400 font-semibold text-sm">{job.company}</span>
                </div>
                <div className="text-xs text-zinc-600 mb-4">
                  {job.location} · {job.type}
                </div>

                {/* Bullets */}
                <ul className="space-y-2 mb-5">
                  {job.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-zinc-400 leading-relaxed"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-zinc-600 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono text-zinc-500 bg-zinc-800/70 border border-zinc-700/60 px-2.5 py-1 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-4">
              Certifications & Recognition
            </h4>
            <div className="space-y-3">
              {[
                { name: "AWS Certified MediaLive & MediaPackage Specialist", year: "Feb 2026" },
                { name: "Advanced ServiceNow Incident Management & Automation", year: "" },
                { name: "India's Top 300 Builders — VibeCon 2025 (YC × Anthropic × Lightspeed × Razorpay)", year: "2025" },
              ].map((cert) => (
                <div key={cert.name} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  <div>
                    <span className="text-sm text-zinc-300">{cert.name}</span>
                    {cert.year && (
                      <span className="text-zinc-600 text-xs ml-2">{cert.year}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
