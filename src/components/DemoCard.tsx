import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface DemoCardData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
  tags?: string[];
}

interface DemoCardProps {
  demo: DemoCardData;
  index: number;
  onWaitingList: () => void;
}

const DemoCard = ({ demo, index, onWaitingList }: DemoCardProps) => {
  const navigate = useNavigate();

  const handlePrimary = () => {
    if (demo.comingSoon) {
      onWaitingList();
    } else {
      navigate(`/demo/${demo.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card-hover group p-6 md:p-8 flex flex-col"
    >
      {demo.comingSoon && (
        <span className="badge-coming-soon mb-4 w-fit">Coming Soon</span>
      )}

      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:bg-primary/20 transition-colors">
        {demo.icon}
      </div>

      <h3 className="font-display font-bold text-lg mb-3 text-foreground">
        {demo.title}
      </h3>

      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
        {demo.description}
      </p>

      {demo.tags && (
        <div className="flex flex-wrap gap-2 mb-6">
          {demo.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <button
        onClick={handlePrimary}
        className="flex items-center gap-2 text-sm font-display font-semibold text-primary hover:text-primary/80 transition-colors group/btn"
      >
        {demo.comingSoon ? "Join Waiting List" : "View Demo"}
        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
};

export default DemoCard;
