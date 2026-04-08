import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroProps {
  onGetAccess: () => void;
}

const Hero = ({ onGetAccess }: HeroProps) => {
  const scrollToDemos = () => {
    document.getElementById("demos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-glow-pulse" />

      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.2em] mb-6">
            Digital Workers Platform
          </p>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 text-balance">
            Real digital workers.{" "}
            <span className="gradient-text">Running real business processes.</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            From customer service to finance to IT — deploy autonomous digital workers in minutes, scale across channels, and monetise through our ecosystem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button onClick={scrollToDemos} className="btn-primary-glow text-base">
            Explore Demos
          </button>
          <button onClick={onGetAccess} className="btn-outline-glow text-base">
            Get Early Access
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-xs text-muted-foreground/60 font-body"
        >
          Powered by Greentic Components, Flows, and MCP · Deterministic orchestration + optional LLM reasoning
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
