import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Send, Loader2, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AIPromptBarProps {
  onGenerate: (prompt: string, type: string) => Promise<void>;
  isGenerating?: boolean;
}

const promptTypes = [
  { id: "section", label: "Add Section", icon: "📦" },
  { id: "hero", label: "Hero Section", icon: "🚀" },
  { id: "features", label: "Features Grid", icon: "✨" },
  { id: "pricing", label: "Pricing Table", icon: "💰" },
  { id: "testimonials", label: "Testimonials", icon: "💬" },
  { id: "footer", label: "Footer", icon: "🔻" },
];

const AIPromptBar = ({ onGenerate, isGenerating = false }: AIPromptBarProps) => {
  const [prompt, setPrompt] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedType, setSelectedType] = useState(promptTypes[0]);

  const handleSubmit = async () => {
    if (!prompt.trim() || isGenerating) return;
    await onGenerate(prompt, selectedType.id);
    setPrompt("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
    >
      <div className="glass-card p-3 glow-effect">
        {/* Quick Actions */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-3 gap-2 mb-3 pb-3 border-b border-border/50">
                {promptTypes.slice(1).map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setSelectedType(type);
                      setPrompt(`Create a ${type.label.toLowerCase()}`);
                    }}
                    className="flex items-center gap-2 p-2 text-sm rounded-lg bg-secondary/50 hover:bg-secondary hover:border-primary/30 border border-transparent transition-all duration-200"
                  >
                    <span>{type.icon}</span>
                    <span className="text-muted-foreground">{type.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Input */}
        <div className="flex items-end gap-3">
          {/* Type Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="glass" size="sm" className="shrink-0">
                <span className="mr-1">{selectedType.icon}</span>
                <span className="hidden sm:inline">{selectedType.label}</span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-card">
              {promptTypes.map((type) => (
                <DropdownMenuItem
                  key={type.id}
                  onClick={() => setSelectedType(type)}
                  className="flex items-center gap-2"
                >
                  <span>{type.icon}</span>
                  {type.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Text Input */}
          <div className="flex-1 relative">
            <Textarea
              placeholder="Describe what you want to create..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsExpanded(true)}
              className="min-h-[44px] max-h-32 py-3 pr-12 resize-none bg-secondary/30 border-border/50"
              rows={1}
            />
            <div className="absolute right-2 bottom-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
              >
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            size="icon"
            variant="glow"
            onClick={handleSubmit}
            disabled={!prompt.trim() || isGenerating}
            className="shrink-0 h-11 w-11"
          >
            {isGenerating ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Hint */}
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press <kbd className="px-1.5 py-0.5 text-xs bg-secondary rounded">Enter</kbd> to generate
        </p>
      </div>
    </motion.div>
  );
};

export default AIPromptBar;
