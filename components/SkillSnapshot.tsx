"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/lib/profile";

const CATEGORY_LABELS: Record<string, string> = {
  cloud: "Cloud",
  infra: "Infrastructure",
  cicd: "CI / CD",
  observability: "Observability",
  security: "Security",
  ai: "AI / GenAI",
};

const CATEGORY_COLORS: Record<string, string> = {
  cloud: "border-orange-700 text-orange-300 bg-orange-900/20",
  infra: "border-cyan-700 text-cyan-300 bg-cyan-900/20",
  cicd: "border-blue-700 text-blue-300 bg-blue-900/20",
  observability: "border-yellow-700 text-yellow-300 bg-yellow-900/20",
  security: "border-red-700 text-red-300 bg-red-900/20",
  ai: "border-purple-700 text-purple-300 bg-purple-900/20",
};

function downloadReport() {
  const { identity, roles, summary, expertise, skills, knowledgeAreas, impact } = profile;
  const date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

  const expertiseRows = Object.entries(expertise)
    .map(([cat, tools]) => `<tr>
      <td style="padding:4px 12px 4px 0;color:#555;font-weight:600;white-space:nowrap;vertical-align:top">${CATEGORY_LABELS[cat] ?? cat}</td>
      <td style="padding:4px 0;color:#222">${(tools as string[]).join("  ·  ")}</td>
    </tr>`)
    .join("");

  const capabilityRows = [
    ["CI/CD & Pipelines", knowledgeAreas.cicd],
    ["Infrastructure as Code", knowledgeAreas.terraform],
    ["DevSecOps", knowledgeAreas.devsecops],
    ["Observability & SRE", knowledgeAreas.observability],
    ["AI / GenAI Engineering", knowledgeAreas.ai],
  ]
    .map(([label, desc]) => `<tr>
      <td style="padding:4px 12px 4px 0;color:#555;font-weight:600;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:4px 0;color:#222;line-height:1.6">${desc}</td>
    </tr>`)
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Technical Capability Report — ${identity.name}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 11pt; color: #111; background: #fff; padding: 36px 48px; }
  @page { size: A4; margin: 18mm 20mm; }
  .header-label { font-size: 8pt; letter-spacing: 3px; text-transform: uppercase; color: #888; margin-bottom: 6px; }
  h1 { font-size: 22pt; font-weight: 800; letter-spacing: 1px; color: #000; line-height: 1.1; }
  .subtitle { font-size: 10pt; color: #444; margin-top: 4px; }
  .divider { border: none; border-top: 1.5px solid #ddd; margin: 14px 0; }
  .thin-divider { border: none; border-top: 1px solid #eee; margin: 10px 0; }
  .section-title { font-size: 8pt; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: #777; margin-bottom: 8px; }
  p { line-height: 1.65; color: #333; }
  table { width: 100%; border-collapse: collapse; }
  .tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 2px; }
  .tag { font-size: 8.5pt; padding: 2px 9px; border: 1px solid #ccc; border-radius: 50px; color: #444; }
  .impact-grid { display: flex; gap: 0; border: 1px solid #ddd; border-radius: 6px; overflow: hidden; margin-top: 4px; }
  .impact-cell { flex: 1; text-align: center; padding: 8px 4px; border-right: 1px solid #ddd; }
  .impact-cell:last-child { border-right: none; }
  .impact-num { font-size: 15pt; font-weight: 800; color: #000; }
  .impact-label { font-size: 7.5pt; color: #888; margin-top: 1px; }
  .footer { margin-top: 18px; font-size: 8pt; color: #aaa; text-align: center; border-top: 1px solid #eee; padding-top: 10px; }
</style>
</head>
<body>

<p class="header-label">Technical Capability Report &nbsp;·&nbsp; ${date}</p>
<h1>${identity.name.toUpperCase()}</h1>
<p class="subtitle">${roles.slice(0, 3).join("  ·  ")}<br/>${identity.location}  ·  ${identity.availability}</p>

<hr class="divider"/>

<p class="section-title">Professional Summary</p>
<p>${summary}</p>

<hr class="thin-divider"/>

<p class="section-title">Core Roles</p>
<div class="tags">${roles.map(r => `<span class="tag">${r}</span>`).join("")}</div>

<hr class="divider"/>

<p class="section-title">Technical Expertise</p>
<table>${expertiseRows}</table>

<hr class="thin-divider"/>

<p class="section-title">Platform Competencies</p>
<div class="tags">${skills.map(s => `<span class="tag">${s}</span>`).join("")}</div>

<hr class="divider"/>

<p class="section-title">Delivery Capability</p>
<table>${capabilityRows}</table>

<hr class="divider"/>

<p class="section-title">Impact at Scale</p>
<div class="impact-grid">
  <div class="impact-cell"><div class="impact-num">${impact.clusters}</div><div class="impact-label">Kubernetes Clusters</div></div>
  <div class="impact-cell"><div class="impact-num">${impact.regions}</div><div class="impact-label">Global Regions</div></div>
  <div class="impact-cell"><div class="impact-num">${impact.pipelines}+</div><div class="impact-label">Pipelines Managed</div></div>
  <div class="impact-cell"><div class="impact-num">${impact.uptime}</div><div class="impact-label">Uptime SLA</div></div>
</div>

<div class="footer">vikashjaiswal.486@gmail.com &nbsp;·&nbsp; github.com/vikas0486 &nbsp;·&nbsp; ${identity.location}</div>

<script>window.onload = function(){ window.print(); }<\/script>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) win.focus();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export default function SkillSnapshot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-cyan-500 text-zinc-300 hover:text-cyan-300 font-semibold px-8 py-4 rounded-xl transition-colors duration-150 text-sm"
      >
        Stack Snapshot
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-zinc-800 p-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
                    Technical Capability Report
                  </p>
                  <h2 className="text-2xl font-bold text-white tracking-wide">
                    {profile.identity.name.toUpperCase()}
                  </h2>
                  <p className="text-cyan-400 text-sm mt-0.5">
                    {profile.identity.title} · {profile.identity.location}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-zinc-500 hover:text-white transition-colors text-xl leading-none"
                >
                  ✕
                </button>
              </div>

              {/* Summary */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-8 border-l-2 border-cyan-800 pl-4">
                {profile.summary}
              </p>

              {/* Expertise by category */}
              <div className="space-y-5 mb-8">
                {Object.entries(profile.expertise).map(([cat, tools]) => (
                  <div key={cat}>
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                      {CATEGORY_LABELS[cat] ?? cat}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(tools as string[]).map((tool) => (
                        <span
                          key={tool}
                          className={`text-xs px-3 py-1 rounded-full border font-medium ${CATEGORY_COLORS[cat]}`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Platform competencies */}
              <div className="mb-8">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                  Platform Competencies
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1 rounded-full border border-zinc-600 text-zinc-300 bg-zinc-900"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact metrics */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Clusters", value: profile.impact.clusters },
                  { label: "Regions", value: profile.impact.regions },
                  { label: "Pipelines", value: `${profile.impact.pipelines}+` },
                  { label: "Uptime", value: profile.impact.uptime },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center"
                  >
                    <p className="text-xl font-bold text-cyan-400">{value}</p>
                    <p className="text-xs text-zinc-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {/* Roles */}
              <div className="mb-8">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                  Roles
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.roles.map((role) => (
                    <span
                      key={role}
                      className="text-xs px-3 py-1 rounded-full border border-zinc-700 text-zinc-300 bg-zinc-900"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={downloadReport}
                  className="flex-1 py-3 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white font-semibold text-sm transition-colors"
                >
                  Download Capability Report
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-6 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
