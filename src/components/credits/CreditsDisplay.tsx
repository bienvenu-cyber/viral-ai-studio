import { motion } from "framer-motion";
import { Zap, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCredits } from "@/hooks/useCredits";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CreditsDisplayProps {
  variant?: "compact" | "full";
  showUpgrade?: boolean;
}

const CreditsDisplay = ({ variant = "compact", showUpgrade = true }: CreditsDisplayProps) => {
  const { credits, remaining, percentage, loading } = useCredits();

  if (loading) {
    return (
      <div className="animate-pulse bg-secondary/50 rounded-lg h-8 w-24" />
    );
  }

  const getStatusColor = () => {
    if (percentage >= 90) return "text-destructive";
    if (percentage >= 70) return "text-yellow-500";
    return "text-primary";
  };

  const getProgressColor = () => {
    if (percentage >= 90) return "bg-destructive";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-primary";
  };

  if (variant === "compact") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link 
            to="/pricing"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <Zap className={`h-4 w-4 ${getStatusColor()}`} />
            <span className="text-sm font-medium">
              {remaining}/{credits.limit}
            </span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="p-3">
          <div className="space-y-2">
            <p className="text-sm font-medium">Credits restants</p>
            <Progress value={percentage} className="h-2 w-32" />
            <p className="text-xs text-muted-foreground">
              {remaining} crédits sur {credits.limit} ({credits.plan})
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 rounded-xl"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg bg-primary/10`}>
            <Zap className={`h-4 w-4 ${getStatusColor()}`} />
          </div>
          <div>
            <p className="text-sm font-medium">Crédits</p>
            <p className="text-xs text-muted-foreground capitalize">{credits.plan} Plan</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-lg font-bold ${getStatusColor()}`}>{remaining}</p>
          <p className="text-xs text-muted-foreground">restants</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{credits.used} utilisés</span>
          <span>{credits.limit} total</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`h-full ${getProgressColor()} rounded-full`}
          />
        </div>
      </div>

      {showUpgrade && credits.plan !== "business" && (
        <Link
          to="/pricing"
          className="flex items-center justify-between mt-4 p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group"
        >
          <span className="text-sm text-primary font-medium">Upgrade votre plan</span>
          <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </motion.div>
  );
};

export default CreditsDisplay;
