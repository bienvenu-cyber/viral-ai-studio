import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Github,
  Loader2,
  Rocket,
  Edit3,
  Sparkles,
  ExternalLink,
  Download,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  isConnected,
  getCurrentUser,
  mockOAuthFlow,
  initiateOAuth,
  isGitHubConfigured,
  createRepository,
  pushToRepository,
  exportAsZip,
  disconnect,
  type GitHubUser,
  type PushResult,
} from "@/services/github";

interface PublishModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  html?: string;
  css?: string;
  projectName?: string;
}

type Step = "generate" | "edit" | "connect" | "deploy";

const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
  { id: "generate", label: "Generate", icon: <Sparkles className="h-4 w-4" /> },
  { id: "edit", label: "Edit", icon: <Edit3 className="h-4 w-4" /> },
  { id: "connect", label: "Connect GitHub", icon: <Github className="h-4 w-4" /> },
  { id: "deploy", label: "Deploy", icon: <Rocket className="h-4 w-4" /> },
];

const PublishModal = ({ 
  open, 
  onOpenChange, 
  html = '', 
  css = '',
  projectName = 'my-viral-site'
}: PublishModalProps) => {
  const [currentStep, setCurrentStep] = useState<Step>("connect");
  const [isConnecting, setIsConnecting] = useState(false);
  const [githubConnected, setGithubConnected] = useState(false);
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [repoName, setRepoName] = useState(projectName.toLowerCase().replace(/\s+/g, '-'));
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState<PushResult | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Check GitHub connection status on mount
  useEffect(() => {
    if (open) {
      const connected = isConnected();
      setGithubConnected(connected);
      if (connected) {
        setGithubUser(getCurrentUser());
        setCurrentStep("deploy");
      } else {
        setCurrentStep("connect");
      }
      setDeployResult(null);
    }
  }, [open]);

  const handleGitHubConnect = async () => {
    setIsConnecting(true);
    
    try {
      if (isGitHubConfigured()) {
        // Real OAuth flow - redirects to GitHub
        initiateOAuth();
        return;
      }
      
      // Mock OAuth flow for demo
      const user = await mockOAuthFlow();
      if (user) {
        setGithubUser(user);
        setGithubConnected(true);
        setCurrentStep("deploy");
        toast.success("Connected to GitHub!");
      }
    } catch (error) {
      toast.error("Failed to connect to GitHub");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setGithubConnected(false);
    setGithubUser(null);
    setCurrentStep("connect");
    toast.success("Disconnected from GitHub");
  };

  const handleDeploy = async () => {
    if (!repoName.trim()) {
      toast.error("Please enter a repository name");
      return;
    }

    setIsDeploying(true);
    
    try {
      const result = await pushToRepository(repoName, html, css);
      
      if (result.success) {
        setDeployResult(result);
        toast.success("Successfully pushed to GitHub!");
      } else {
        toast.error(result.error || "Failed to deploy");
      }
    } catch (error) {
      toast.error("Deployment failed. Please try again.");
    } finally {
      setIsDeploying(false);
    }
  };

  const handleExportZip = async () => {
    setIsExporting(true);
    
    try {
      await exportAsZip(html, css, repoName || projectName);
      toast.success("ZIP file downloaded!");
    } catch (error) {
      toast.error("Failed to export. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const getStepStatus = (step: Step) => {
    const stepIndex = steps.findIndex((s) => s.id === step);
    const currentIndex = steps.findIndex((s) => s.id === currentStep);

    if (step === "generate" || step === "edit") return "completed";
    if (step === "connect" && githubConnected) return "completed";
    if (step === "deploy" && deployResult?.success) return "completed";
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  const handleClose = () => {
    setDeployResult(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
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
          {/* Export ZIP Option - Always visible */}
          <div className="p-4 rounded-xl bg-secondary/20 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Download as ZIP</p>
                  <p className="text-xs text-muted-foreground">Export without GitHub</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportZip}
                disabled={isExporting}
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Export
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Connect Step */}
          {currentStep === "connect" && !githubConnected && (
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
                {!isGitHubConfigured() && (
                  <p className="text-xs text-amber-500/80 mb-4">
                    ⚠️ GitHub OAuth not configured - using demo mode
                  </p>
                )}
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

          {/* Deploy Step */}
          {(currentStep === "deploy" || githubConnected) && !deployResult?.success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Connected User */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3">
                  {githubUser?.avatar_url ? (
                    <img 
                      src={githubUser.avatar_url} 
                      alt={githubUser.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5 text-primary" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{githubUser?.name || 'Connected'}</p>
                    <p className="text-xs text-muted-foreground">@{githubUser?.login}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Repository Name</label>
                <Input
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  placeholder="my-website"
                  className="bg-secondary/50"
                />
                <p className="text-xs text-muted-foreground">
                  github.com/{githubUser?.login || 'username'}/{repoName || 'repo-name'}
                </p>
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
                    Pushing to GitHub...
                  </>
                ) : (
                  <>
                    <Rocket className="h-4 w-4" />
                    Push to GitHub
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {/* Success State */}
          {deployResult?.success && (
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
                  Successfully Pushed! 🎉
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your code is now on GitHub and ready to deploy.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/50 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Repository</p>
                  <a
                    href={deployResult.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center justify-center gap-1"
                  >
                    {deployResult.repoUrl}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">
                  Deploy with Vercel, Netlify, or GitHub Pages
                </p>
              </div>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
                <Button 
                  variant="glow"
                  onClick={() => window.open(deployResult.repoUrl, '_blank')}
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PublishModal;
