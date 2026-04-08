const Footer = () => (
  <footer className="border-t border-border/20 py-12">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
          <span className="font-display font-bold text-primary-foreground text-[10px]">G</span>
        </div>
        <span className="font-display font-semibold text-sm text-foreground">Greentic</span>
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
