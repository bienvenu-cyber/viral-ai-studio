import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, Layout, Briefcase, FileText, ShoppingBag, Image, Calendar } from "lucide-react";
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
import { createProject } from "@/services/pocketbase";
import { toast } from "sonner";
import { templates } from "@/components/templates/TemplatesGallery";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectCreated?: () => void;
}

const quickTemplates = [
  { id: "blank", name: "Blank", icon: <Layout className="h-5 w-5" />, prompt: "" },
  { id: "landing", name: "Landing Page", icon: <Sparkles className="h-5 w-5" />, prompt: "Create a modern SaaS landing page with hero, features, and pricing" },
  { id: "portfolio", name: "Portfolio", icon: <Briefcase className="h-5 w-5" />, prompt: "Create a minimal creative portfolio website" },
  { id: "blog", name: "Blog", icon: <FileText className="h-5 w-5" />, prompt: "Create a clean blog layout with featured posts" },
  { id: "ecommerce", name: "E-commerce", icon: <ShoppingBag className="h-5 w-5" />, prompt: "Create an e-commerce product showcase" },
  { id: "gallery", name: "Gallery", icon: <Image className="h-5 w-5" />, prompt: "Create a beautiful image gallery" },
];

const CreateProjectModal = ({ open, onOpenChange, onProjectCreated }: CreateProjectModalProps) => {
  const [projectName, setProjectName] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("blank");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!projectName.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const project = await createProject({
        name: projectName.trim(),
        description: aiPrompt || `Created with AI prompt`,
      });
      
      toast.success("Project created!");
      onProjectCreated?.();
      onOpenChange(false);
      setProjectName("");
      setAiPrompt("");
      
      navigate(`/editor/${project.id}`, { 
        state: { prompt: aiPrompt, projectName } 
      });
    } catch (error) {
      toast.error("Failed to create project");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
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
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">
              Start with a template
            </label>
            <div className="grid grid-cols-3 gap-3">
              {quickTemplates.map((template) => (
                <motion.button
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    setAiPrompt(template.prompt);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                    selectedTemplate === template.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/50 bg-secondary/30 hover:bg-secondary hover:border-primary/30"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    selectedTemplate === template.id ? "bg-primary/20" : "bg-secondary"
                  }`}>
                    {template.icon}
                  </div>
                  <span className="text-sm font-medium">{template.name}</span>
                </motion.button>
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
