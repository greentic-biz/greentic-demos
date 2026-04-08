import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";

interface WaitingListPopupProps {
  open: boolean;
  onClose: () => void;
}

const userTypes = ["Customer", "Technical Partner", "Reseller", "Developer"] as const;

const WaitingListPopup = ({ open, onClose }: WaitingListPopupProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    jobTitle: "",
    type: "" as string,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: call ChatGPT enrichment + HubSpot lead creation
    console.log("Lead captured:", {
      type: "waiting_list",
      source: "demos.greentic.ai",
      interest: "general",
      user: form,
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", company: "", email: "", jobTitle: "", type: "" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={handleClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative glass-card p-8 md:p-10 w-full max-w-lg"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <>
                <div className="mb-8">
                  <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                    Get Early Access to Greentic
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Join the next generation of digital workers
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    required
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <input
                    required
                    placeholder="Company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <input
                    required
                    placeholder="Job Title"
                    value={form.jobTitle}
                    onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    {userTypes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, type: t })}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                          form.type === t
                            ? "bg-primary/15 border-primary/50 text-primary"
                            : "bg-secondary border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={!form.type}
                    className="btn-primary-glow w-full text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Join the Waiting List
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 size={48} className="text-primary mx-auto mb-4" />
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  You're on the list
                </h3>
                <p className="text-muted-foreground text-sm mb-8">
                  We'll be in touch soon.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={handleClose} className="btn-outline-glow text-sm">
                    Explore Demos
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitingListPopup;
