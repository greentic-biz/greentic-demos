import { motion } from "framer-motion";
import {
  Headphones,
  FileCheck,
  ServerCog,
  Wand2,
  Globe,
  Store,
  LayoutGrid,
} from "lucide-react";
import DemoCard, { type DemoCardData } from "./DemoCard";

const demos: DemoCardData[] = [
  {
    id: "customer-service",
    title: "AI Customer Service Worker",
    description:
      "Automate support, resolve tickets, and escalate intelligently across channels.",
    icon: <Headphones size={24} />,
    tags: ["Chat", "Escalation", "Multi-channel"],
  },
  {
    id: "invoice-approval",
    title: "AI Invoice Approval Worker",
    description:
      "Validate, route, and approve invoices with full auditability and human-in-the-loop control.",
    icon: <FileCheck size={24} />,
    tags: ["Governance", "Compliance", "Adaptive Cards"],
  },
  {
    id: "it-operations",
    title: "AI IT Operations Worker",
    description:
      "Query systems, diagnose issues, and automate operations through conversational workflows.",
    icon: <ServerCog size={24} />,
    tags: ["Chat2Data", "Context-aware", "Multi-turn"],
  },
  {
    id: "designer",
    title: "Digital Worker Designer",
    description:
      "Design and deploy digital workers from prompts — no-code to full-code.",
    icon: <Wand2 size={24} />,
    comingSoon: true,
    tags: ["No-code", "Prompt-driven"],
  },
  {
    id: "multi-channel",
    title: "Deploy Anywhere",
    description:
      "Run the same digital worker across Teams, Web, WhatsApp, and more.",
    icon: <Globe size={24} />,
    tags: ["Teams", "Web", "WhatsApp"],
  },
  {
    id: "marketplace",
    title: "Greentic Marketplace",
    description:
      "Buy, sell, and scale AI solutions across a global ecosystem.",
    icon: <Store size={24} />,
    comingSoon: true,
    tags: ["Ecosystem", "Monetisation"],
  },
  {
    id: "adaptive-cards",
    title: "Structured AI Interfaces",
    description:
      "Replace unreliable chat with deterministic, structured, and interactive UI.",
    icon: <LayoutGrid size={24} />,
    tags: ["Adaptive Cards", "Deterministic"],
  },
];

interface DemoGridProps {
  onWaitingList: () => void;
}

const DemoGrid = ({ onWaitingList }: DemoGridProps) => {
  return (
    <section id="demos" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            Demo Showcase
          </p>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-foreground mb-4">
            Explore Digital Workers
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Each demo showcases a fully functional digital worker solving real business problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo, i) => (
            <DemoCard key={demo.id} demo={demo} index={i} onWaitingList={onWaitingList} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoGrid;
