import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Github,
  Loader2,
  Rocket,
  ArrowRight,
  Edit3,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PublishModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "generate" | "edit" | "connect" | "deploy";

const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
  { id: "generate", label: "Generate", icon: <Sparkles className="h-4 w-4" /> },
  { id: "edit", label: "Edit", icon: <Edit3 className="h-4 w-4" /> },
  { id: "connect", label: "Connect GitHub", icon: <Github className="h-4 w-4" /> },
  { id: "deploy", label: "Deploy", icon: <Rocket className="h-4 w-4" /> },
];

const PublishModal = ({ open, onOpenChange }: PublishModalProps) => {
  const [currentStep, setCurrentStep] = useState<Step>("connect");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [repoName, setRepoName] = useState("my-viral-site");
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  const handleGitHubConnect = async () => {
    setIsConnecting(true);
    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsConnecting(false);
    setIsConnected(true);
    setCurrentStep("deploy");
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    // Simulate deployment
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsDeploying(false);
    setIsDeployed(true);
  };

  const getStepStatus = (step: Step) => {
    const stepIndex = steps.findIndex((s) => s.id === step);
    const currentIndex = steps.findIndex((s) => s.id === currentStep);

    if (step === "generate" || step === "edit") return "completed";
    if (step === "connect" && isConnected) return "completed";
    if (step === "deploy" && isDeployed) return "completed";
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-border/50 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Rocket className="h-5 w-5 text-primary" />
            Publish Your Site
          </DialogTitle>
        </DialogHeader>

        {/* Stepper */}
        <div className="py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    getStepStatus(step.id) === "completed"
                      ? "bg-primary border-primary text-primary-foreground"
                      : getStepStatus(step.id) === "current"
                      ? "border-primary text-primary bg-primary/10"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {getStepStatus(step.id) === "completed" ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </motion.div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-20 h-0.5 mx-2 transition-colors duration-300 ${
                      getStepStatus(steps[index + 1].id) !== "upcoming"
                        ? "bg-primary"
                        : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 px-1">
            {steps.map((step) => (
              <span
                key={step.id}
                className={`text-xs font-medium ${
                  getStepStatus(step.id) === "current"
                    ? "text-primary"
                    : getStepStatus(step.id) === "completed"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === "connect" && !isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="p-6 rounded-xl bg-secondary/30 border border-border/50 text-center">
                <Github className="h-12 w-12 mx-auto mb-4 text-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  Connect to GitHub
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your GitHub account to push your generated code and
                  enable automatic deployments.
                </p>
                <Button
                  variant="glow"
                  onClick={handleGitHubConnect}
                  disabled={isConnecting}
                  className="w-full sm:w-auto"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Github className="h-4 w-4" />
                      Connect GitHub
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {(currentStep === "deploy" || isConnected) && !isDeployed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium">Repository Name</label>
                <Input
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  placeholder="my-website"
                  className="bg-secondary/50"
                />
                <p className="text-xs text-muted-foreground">
                  This will create a new repository: github.com/your-username/
                  {repoName}
                </p>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">
                  GitHub connected successfully
                </span>
              </div>

              <Button
                variant="glow"
                onClick={handleDeploy}
                disabled={isDeploying || !repoName.trim()}
                className="w-full"
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <Rocket className="h-4 w-4" />
                    Push to GitHub & Deploy
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {isDeployed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Successfully Deployed! 🎉
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your site is now live and ready to share.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Your site URL</p>
                <a
                  href="#"
                  className="text-primary hover:underline flex items-center justify-center gap-1"
                >
                  https://{repoName}.vercel.app
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PublishModal;
