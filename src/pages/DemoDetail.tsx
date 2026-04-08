import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Headphones, FileCheck, ServerCog, Globe, LayoutGrid, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitingListPopup from "@/components/WaitingListPopup";
import { useState, useEffect } from "react";

interface DemoDetail {
  title: string;
  tagline: string;
  icon: React.ReactNode;
  whatItDoes: string;
  steps: { title: string; desc: string }[];
  architecture: string[];
  focus: string[];
}

const demoData: Record<string, DemoDetail> = {
  "customer-service": {
    title: "AI Customer Service Worker",
    tagline: "Automate support, resolve tickets, and escalate intelligently across channels.",
    icon: <Headphones size={32} />,
    whatItDoes:
      "This digital worker handles inbound customer queries across chat, email, and messaging platforms. It understands context, retrieves relevant data, makes decisions using deterministic flows, and escalates to humans only when necessary.",
    steps: [
      { title: "Receive Message", desc: "Customer sends a query via any connected channel (Teams, Web, WhatsApp)." },
      { title: "Classify & Route", desc: "The worker classifies intent using orchestrated AI and routes to the correct flow." },
      { title: "Retrieve Context", desc: "Pulls customer data, order history, and knowledge base articles in real time." },
      { title: "Resolve or Escalate", desc: "Provides a structured response via Adaptive Cards, or escalates with full context." },
    ],
    architecture: ["Greentic Flow Engine", "MCP Connectors", "Adaptive Cards Renderer", "Channel Gateway (Teams, WhatsApp, Web)"],
    focus: ["Multi-channel", "Context-aware", "Human-in-the-loop escalation"],
  },
  "invoice-approval": {
    title: "AI Invoice Approval Worker",
    tagline: "Validate, route, and approve invoices with full auditability and human-in-the-loop control.",
    icon: <FileCheck size={32} />,
    whatItDoes:
      "Automates the end-to-end invoice approval process. The worker validates invoice data, checks compliance rules, routes for approval based on configurable thresholds, and creates a full audit trail.",
    steps: [
      { title: "Receive Invoice", desc: "Invoice arrives via email, ERP integration, or manual upload." },
      { title: "Validate & Extract", desc: "AI extracts key fields and validates against compliance rules." },
      { title: "Route for Approval", desc: "Routes to the correct approver based on amount, department, and policy." },
      { title: "Approve via Adaptive Card", desc: "Approver reviews and acts on a structured card — no email chains needed." },
    ],
    architecture: ["Greentic Flow Engine", "Document AI Extractor", "Approval Routing Rules", "ERP Connectors"],
    focus: ["Governance", "Compliance", "Adaptive Cards approvals"],
  },
  "it-operations": {
    title: "AI IT Operations Worker",
    tagline: "Query systems, diagnose issues, and automate operations through conversational workflows.",
    icon: <ServerCog size={32} />,
    whatItDoes:
      "An IT operations assistant that enables conversational querying of systems, automated diagnostics, and intelligent ticket creation — all through natural language backed by deterministic orchestration.",
    steps: [
      { title: "Conversational Query", desc: "Operator asks a question in natural language about system status." },
      { title: "Chat2Data Translation", desc: "Query is translated to structured API calls against monitoring systems." },
      { title: "Diagnose & Analyze", desc: "Results are analyzed with context from previous interactions." },
      { title: "Automate or Report", desc: "Automated remediation or structured incident report generation." },
    ],
    architecture: ["Chat2Data Engine", "Monitoring Connectors (SNMP, APIs)", "Context Memory", "Incident Management Integration"],
    focus: ["Chat2Data", "Context-aware queries", "Multi-turn intelligence"],
  },
  "multi-channel": {
    title: "Deploy Anywhere",
    tagline: "Run the same digital worker across Teams, Web, WhatsApp, and more.",
    icon: <Globe size={32} />,
    whatItDoes:
      "A single digital worker definition that deploys seamlessly across multiple channels. Write once, run everywhere — with channel-specific rendering handled automatically by the Greentic runtime.",
    steps: [
      { title: "Define Once", desc: "Build your digital worker using Components and Flows." },
      { title: "Configure Channels", desc: "Enable Teams, Web Widget, WhatsApp, or custom channels." },
      { title: "Auto-Render", desc: "Adaptive Cards and responses render natively in each channel." },
      { title: "Unified Analytics", desc: "Track performance across all channels from a single dashboard." },
    ],
    architecture: ["Channel Gateway", "Adaptive Cards Cross-render", "Unified Analytics Engine", "Greentic Runtime"],
    focus: ["Cross-platform", "Write once deploy anywhere", "Channel-native UX"],
  },
  "adaptive-cards": {
    title: "Structured AI Interfaces",
    tagline: "Replace unreliable chat with deterministic, structured, and interactive UI.",
    icon: <LayoutGrid size={32} />,
    whatItDoes:
      "Adaptive Cards provide structured, interactive UI elements within conversational interfaces. Instead of relying on free-text AI responses, workers present users with forms, buttons, and data visualizations that guarantee consistent, actionable interactions.",
    steps: [
      { title: "Design Card Template", desc: "Create reusable card templates with inputs, actions, and data bindings." },
      { title: "Orchestrate Presentation", desc: "Flow engine determines which card to show based on context and state." },
      { title: "Capture Input", desc: "User interacts with structured UI — selections, approvals, data entry." },
      { title: "Process & Continue", desc: "Input flows back into the orchestration engine for next steps." },
    ],
    architecture: ["Adaptive Cards Schema", "Template Engine", "Greentic Flow Bindings", "Cross-channel Renderer"],
    focus: ["Deterministic UI", "Structured interactions", "Reliable data capture"],
  },
};

const DemoDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const demo = id ? demoData[id] : null;

  if (!demo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Demo not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar onGetAccess={() => setPopupOpen(true)} />
      <WaitingListPopup open={popupOpen} onClose={() => setPopupOpen(false)} />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8"
          >
            <ArrowLeft size={16} /> Back to demos
          </button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
              {demo.icon}
            </div>
            <h1 className="font-display font-extrabold text-3xl md:text-5xl text-foreground mb-4">{demo.title}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">{demo.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* What it does */}
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 md:p-10">
            <h2 className="font-display font-bold text-xl mb-4 text-foreground">What it does</h2>
            <p className="text-muted-foreground leading-relaxed">{demo.whatItDoes}</p>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-display font-bold text-xl mb-8 text-foreground">How it works</h2>
          <div className="grid gap-4">
            {demo.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 flex gap-5 items-start"
              >
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-display font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-display font-bold text-xl mb-6 text-foreground">Architecture</h2>
          <div className="glass-card p-8">
            <div className="flex flex-wrap gap-3 mb-6">
              {demo.architecture.map((comp) => (
                <span key={comp} className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium border border-border/50">
                  {comp}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {demo.focus.map((f) => (
                <span key={f} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="glass-card p-8 md:p-12 text-center">
            <h2 className="font-display font-bold text-2xl text-foreground mb-3">Ready to deploy this worker?</h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
              Get this solution running in your environment in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setPopupOpen(true)} className="btn-primary-glow text-sm flex items-center gap-2 justify-center">
                Get this solution <ArrowRight size={16} />
              </button>
              <button onClick={() => setPopupOpen(true)} className="btn-outline-glow text-sm">
                Talk to us
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DemoDetailPage;
