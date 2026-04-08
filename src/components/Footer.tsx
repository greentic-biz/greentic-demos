import greenticLogo from "@/assets/greentic-logo.png";

const Footer = () => (
  <footer className="border-t border-border/20 py-12">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <img src={greenticLogo} alt="Greentic" className="h-6 w-6" />
        <span className="font-display font-semibold text-sm text-foreground">Greentic<span className="text-primary">.ai</span></span>
      </div>
      <p className="text-muted-foreground text-xs">
        Deterministic orchestration + optional LLM reasoning · Deployable as bundles
      </p>
      <p className="text-muted-foreground/50 text-xs">
        © {new Date().getFullYear()} Greentic. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
