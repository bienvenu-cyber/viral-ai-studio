import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Bot, User, Sparkles, ChevronDown, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: string;
  timestamp: Date;
}

interface AIChatSidebarProps {
  onGenerate: (prompt: string, type: string) => Promise<void>;
  isGenerating?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const promptTypes = [
  { id: "section", label: "Add Section", icon: "📦" },
  { id: "hero", label: "Hero Section", icon: "🚀" },
  { id: "features", label: "Features Grid", icon: "✨" },
  { id: "pricing", label: "Pricing Table", icon: "💰" },
  { id: "testimonials", label: "Testimonials", icon: "💬" },
  { id: "footer", label: "Footer", icon: "🔻" },
  { id: "navbar", label: "Navigation", icon: "🧭" },
  { id: "cta", label: "Call to Action", icon: "📢" },
];

const AIChatSidebar = ({ 
  onGenerate, 
  isGenerating = false, 
  isCollapsed = false,
  onToggleCollapse 
}: AIChatSidebarProps) => {
  const [prompt, setPrompt] = useState("");
  const [selectedType, setSelectedType] = useState(promptTypes[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your AI assistant. Tell me what you want to create and I'll generate the HTML for you. You can select a component type or just describe what you need.",
      timestamp: new Date(),
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async () => {
    if (!prompt.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
      type: selectedType.label,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentPrompt = prompt;
    setPrompt("");

    try {
      await onGenerate(currentPrompt, selectedType.id);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I've added a ${selectedType.label.toLowerCase()} based on your request: "${currentPrompt}". You can see it in the canvas on the right. Want me to make any changes?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error while generating the content. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (isCollapsed) {
    return (
      <div className="w-12 border-r border-border/50 bg-card/50 flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="mb-4"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
        <div className="flex flex-col items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <span className="text-xs text-muted-foreground [writing-mode:vertical-lr] rotate-180">
            AI Chat
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-80 border-r border-border/50 bg-card/50 flex flex-col h-full"
    >
      {/* Header */}
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span className="font-semibold text-sm">AI Assistant</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="h-8 w-8"
        >
          <PanelLeftClose className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                    message.role === "assistant"
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`flex-1 p-3 rounded-xl text-sm ${
                    message.role === "assistant"
                      ? "bg-secondary/50"
                      : "bg-primary/10 text-foreground"
                  }`}
                >
                  {message.type && message.role === "user" && (
                    <span className="text-xs text-muted-foreground block mb-1">
                      {message.type}
                    </span>
                  )}
                  {message.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="h-4 w-4 text-primary animate-spin" />
              </div>
              <div className="flex-1 p-3 rounded-xl bg-secondary/50 text-sm">
                <span className="text-muted-foreground">Generating content...</span>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-border/50">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {promptTypes.slice(0, 4).map((type) => (
            <button
              key={type.id}
              onClick={() => {
                setSelectedType(type);
                setPrompt(`Create a ${type.label.toLowerCase()}`);
                textareaRef.current?.focus();
              }}
              className={`text-xs px-2 py-1 rounded-full transition-colors ${
                selectedType.id === type.id
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              {type.icon} {type.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="shrink-0 h-10">
                <span className="mr-1">{selectedType.icon}</span>
                <ChevronDown className="h-3 w-3" />
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

          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              placeholder="Describe what you want..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[40px] max-h-24 py-2.5 pr-10 resize-none bg-secondary/30 border-border/50 text-sm"
              rows={1}
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={handleSubmit}
              disabled={!prompt.trim() || isGenerating}
              className="absolute right-1 top-1 h-8 w-8"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIChatSidebar;