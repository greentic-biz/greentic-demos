import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onGetAccess: () => void;
}

const Navbar = ({ onGetAccess }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/20 backdrop-blur-2xl"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-sm">G</span>
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            Greentic
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#demos" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Demos
          </a>
          <a href="#architecture" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Architecture
          </a>
          <button onClick={onGetAccess} className="btn-primary-glow text-sm">
            Get Early Access
          </button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border/20 px-6 py-4 flex flex-col gap-4"
        >
          <a href="#demos" className="text-muted-foreground hover:text-foreground transition-colors text-sm" onClick={() => setMobileOpen(false)}>Demos</a>
          <a href="#architecture" className="text-muted-foreground hover:text-foreground transition-colors text-sm" onClick={() => setMobileOpen(false)}>Architecture</a>
          <button onClick={() => { onGetAccess(); setMobileOpen(false); }} className="btn-primary-glow text-sm w-fit">Get Early Access</button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
