import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateProjectModal = ({ open, onOpenChange }: CreateProjectModalProps) => {
  const [projectName, setProjectName] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!projectName.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate project creation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const projectId = Math.random().toString(36).substr(2, 9);
    onOpenChange(false);
    navigate(`/editor/${projectId}`, { 
      state: { prompt: aiPrompt, projectName } 
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-border/50 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-primary" />
            Create New Project
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Project Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Project Name
            </label>
            <Input
              placeholder="My Awesome Website"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-secondary/50"
            />
          </div>

          {/* AI Prompt */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-primary" />
              AI Prompt (optional)
            </label>
            <Textarea
              placeholder="Describe your website... e.g., 'A modern SaaS landing page with hero section, features grid, and pricing table'"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="bg-secondary/50 min-h-[120px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Our AI will generate a starting template based on your description
            </p>
          </div>

          {/* Quick Templates */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Or start with a template
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Landing Page", "Portfolio", "Blog"].map((template) => (
                <button
                  key={template}
                  onClick={() => setAiPrompt(`Create a ${template.toLowerCase()}`)}
                  className="p-3 text-sm text-center rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary hover:border-primary/30 transition-all duration-200"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="glow"
            onClick={handleCreate}
            disabled={!projectName.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Create Project
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
