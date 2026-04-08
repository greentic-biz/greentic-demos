import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface WebchatPopupProps {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const WebchatPopup = ({ open, onClose, url, title }: WebchatPopupProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative glass-card w-full max-w-2xl overflow-hidden"
            style={{ height: "min(80vh, 700px)" }}
          >
            <div className="flex items-center justify-between p-4 border-b border-border/30">
              <h2 className="font-display font-bold text-lg text-foreground">{title}</h2>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <iframe
              src={url}
              className="w-full border-0"
              style={{ height: "calc(100% - 57px)" }}
              title={title}
              allow="microphone; camera"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WebchatPopup;
