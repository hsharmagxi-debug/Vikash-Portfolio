import { NextResponse } from "next/server";
import { profile } from "@/lib/profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOPICS: {
  key: keyof typeof profile.knowledgeAreas;
  label: string;
  keywords: string[];
  tools: string[];
  principles: string[];
}[] = [
  {
    key: "broadcasting",
    label: "Live Broadcasting & Streaming",
    keywords: ["broadcast", "nhl", "streaming", "medialive", "mediapackage", "srt", "rtmp", "vtoc", "live", "feed", "uptime", "servicenow", "incident", "monitoring"],
    tools: ["AWS MediaLive", "MediaPackage", "SRT / RTMP", "VTOC", "ServiceNow", "CloudWatch"],
    principles: [
      "Pre/post-game checklists for 100% compliance on every broadcast",
      "Real-time monitoring across 16 simultaneous feeds",
      "ServiceNow incident management with rapid triage protocols",
      "Zero-escalation goal: resolve issues before they impact viewers",
      "Low-latency SRT/RTMP protocols for mission-critical live events",
    ],
  },
  {
    key: "ai",
    label: "AI & Agentic Systems",
    keywords: ["ai", "llm", "rag", "agent", "claude", "ollama", "embedding", "vector", "multi-agent", "n8n", "langraph", "autonomous", "aether", "polymind", "self-hosted"],
    tools: ["Claude", "Ollama", "ChromaDB", "n8n", "Open WebUI", "FastAPI"],
    principles: [
      "Privacy-first: self-hosted AI for air-gapped enterprise environments",
      "RAG pipeline: chunk → embed → store in vector DB → retrieve → generate",
      "Multi-agent orchestration for parallel task execution",
      "LangGraph-style agents with tool-use for workflow automation",
      "Zero vendor lock-in: open-source stack with local inference via Ollama",
    ],
  },
  {
    key: "saas",
    label: "SaaS Building & Product Engineering",
    keywords: ["saas", "product", "kpi", "hub", "supabase", "next", "nextjs", "startup", "founder", "b2b", "mrr", "monetization", "pipeline", "intelligence"],
    tools: ["Next.js 15", "TypeScript", "Supabase", "Claude", "Vercel", "Tailwind CSS"],
    principles: [
      "Ship fast, harden incrementally — production-grade from day one",
      "Supabase RLS for row-level security on multi-tenant data",
      "AI-synthesized content pipelines for automated intelligence briefs",
      "Documentation-first approach for onboarding and scale",
      "Multiple monetization streams validated before scaling spend",
    ],
  },
  {
    key: "platform",
    label: "Platform Engineering & Reliability",
    keywords: ["platform", "reliability", "observability", "automation", "ci", "cd", "deploy", "uptime", "sla", "docker", "vercel", "github actions", "devops"],
    tools: ["Docker", "GitHub Actions", "Vercel", "AWS", "Supabase", "CI/CD Pipelines"],
    principles: [
      "99.97%+ uptime focus — reliability is a feature, not an afterthought",
      "Automation over manual toil: everything that can run on a schedule, should",
      "Observability built-in: logs, metrics, and alerts from day one",
      "Incremental hardening: ship first, secure and optimize in layers",
      "Documentation-first: runbooks, SOPs, and checklists before incidents happen",
    ],
  },
  {
    key: "networking",
    label: "AV Systems & Enterprise Networking",
    keywords: ["av", "audio", "video", "crestron", "qsys", "amx", "hdbaset", "vlan", "switching", "network", "enterprise", "commissioning", "rstp", "mstp"],
    tools: ["Q-SYS", "Crestron", "AMX", "HDBaseT", "L2/L3 Switches", "VLAN 802.1Q"],
    principles: [
      "SOW-driven delivery: scope, commission, and red-line drawings for every project",
      "VLAN segmentation (802.1Q trunking) for AV/IT traffic isolation",
      "RSTP/MSTP with BPDU Guard and DHCP Snooping for network stability",
      "Q-SYS/Crestron programming for room automation and DSP routing",
      "HDBaseT for long-distance uncompressed AV over structured cabling",
    ],
  },
];

function matchTopic(question: string) {
  const q = question.toLowerCase();
  let best: (typeof TOPICS)[0] | null = null;
  let bestScore = 0;

  for (const topic of TOPICS) {
    const score = topic.keywords.filter((kw) => q.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      best = topic;
    }
  }
  return best;
}

export async function POST(req: Request) {
  const { question } = await req.json();

  if (!question?.trim()) {
    return NextResponse.json({ answer: "Please ask a question." });
  }

  const topic = matchTopic(question);

  if (!topic) {
    return NextResponse.json({
      answer: `Hi, I'm ${profile.identity.name} — ${profile.identity.title}.

I can answer questions on:
  · Live broadcasting & streaming infrastructure
  · AI & agentic systems (Claude, Ollama, RAG, multi-agent)
  · SaaS building & product engineering
  · Platform engineering & reliability
  · AV systems & enterprise networking

Try asking something like "How do you manage live NHL broadcasts?" or "How did you build AetherAI?"`,
    });
  }

  const knowledgeBase = profile.knowledgeAreas[topic.key];

  const answer = `${profile.identity.name} on ${topic.label}
${"─".repeat(48)}

${knowledgeBase}

TOOLS I USE
${topic.tools.map((t) => `  · ${t}`).join("\n")}

KEY PRINCIPLES
${topic.principles.map((p) => `  ✔ ${p}`).join("\n")}

IMPACT
  · ${profile.impact.feeds} simultaneous live feeds · ${profile.impact.uptime} uptime
  · ${profile.impact.projects}+ production projects · ${profile.impact.recognition} India Builder (VibeCon 2025)

─────────────────────────────────────────────────
Have a deeper question? → hsharma.gxi@gmail.com`;

  return NextResponse.json({ answer });
}
