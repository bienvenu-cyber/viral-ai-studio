import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ChevronDown, 
  PanelLeftClose, 
  PanelLeft,
  Zap,
  Code2,
  Palette,
  Layout,
  Trash2,
  Copy,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

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
  { id: "section", label: "Add Section", icon: <Layout className="h-4 w-4" /> },
  { id: "hero", label: "Hero Section", icon: <Zap className="h-4 w-4" /> },
  { id: "features", label: "Features Grid", icon: <Sparkles className="h-4 w-4" /> },
  { id: "pricing", label: "Pricing Table", icon: <Code2 className="h-4 w-4" /> },
  { id: "testimonials", label: "Testimonials", icon: <User className="h-4 w-4" /> },
  { id: "footer", label: "Footer", icon: <Layout className="h-4 w-4" /> },
  { id: "navbar", label: "Navigation", icon: <Layout className="h-4 w-4" /> },
  { id: "cta", label: "Call to Action", icon: <Palette className="h-4 w-4" /> },
];

const quickPrompts = [
  "Make it more modern",
  "Add animations",
  "Change colors to blue theme",
  "Add more whitespace",
  "Make it responsive",
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

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Chat cleared! How can I help you create something amazing?",
        timestamp: new Date(),
      },
    ]);
    toast.success("Chat cleared");
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  };

  if (isCollapsed) {
    return (
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 56 }}
        className="border-r border-border/50 bg-gradient-to-b from-card to-card/50 flex flex-col items-center py-4"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="mb-4 hover:bg-primary/10"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
        <div className="flex flex-col items-center gap-3">
          <motion.div 
            className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-5 w-5 text-primary" />
          </motion.div>
          <span className="text-xs text-muted-foreground [writing-mode:vertical-lr] rotate-180 font-medium">
            AI Assistant
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-96 border-r border-border/50 bg-gradient-to-b from-card to-card/50 flex flex-col h-full"
    >
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <motion.div 
              className="p-2 rounded-xl bg-gradient-to-br from-primary to-blue-500 shadow-lg shadow-primary/20"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </motion.div>
            <div>
              <h2 className="font-semibold text-sm">AI Assistant</h2>
              <p className="text-xs text-muted-foreground">Powered by AI</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card">
                <DropdownMenuItem onClick={clearChat}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="h-8 w-8"
            >
              <PanelLeftClose className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs text-muted-foreground">Ready to generate</span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 px-4 py-4">
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  delay: index * 0.05 
                }}
                className={`group flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${
                    message.role === "assistant"
                      ? "bg-gradient-to-br from-primary to-blue-500 text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </motion.div>
                <div className="flex-1 relative">
                  <div
                    className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      message.role === "assistant"
                        ? "bg-secondary/80 rounded-tl-sm"
                        : "bg-primary/20 text-foreground rounded-tr-sm"
                    }`}
                  >
                    {message.type && message.role === "user" && (
                      <span className="inline-flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-2">
                        {selectedType.icon}
                        {message.type}
                      </span>
                    )}
                    <p>{message.content}</p>
                  </div>
                  
                  {/* Message actions */}
                  <div className="absolute -bottom-1 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyMessage(message.content)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Generating indicator */}
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-sm">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </motion.div>
              </div>
              <div className="flex-1 p-3 rounded-2xl rounded-tl-sm bg-secondary/80">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Generating</span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-border/50 bg-card/80 backdrop-blur-sm space-y-3">
        {/* Quick prompts */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {quickPrompts.map((qp) => (
            <motion.button
              key={qp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setPrompt(qp);
                textareaRef.current?.focus();
              }}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/50 transition-colors"
            >
              {qp}
            </motion.button>
          ))}
        </div>

        {/* Component type buttons */}
        <div className="flex flex-wrap gap-1.5">
          {promptTypes.slice(0, 4).map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedType(type);
                setPrompt(`Create a ${type.label.toLowerCase()}`);
                textareaRef.current?.focus();
              }}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${
                selectedType.id === type.id
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              {type.icon}
              {type.label}
            </motion.button>
          ))}
        </div>

        {/* Input field */}
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="shrink-0 h-11 gap-2">
                {selectedType.icon}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-card" align="start">
              {promptTypes.map((type) => (
                <DropdownMenuItem
                  key={type.id}
                  onClick={() => setSelectedType(type)}
                  className="flex items-center gap-2"
                >
                  {type.icon}
                  {type.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              placeholder="Describe what you want to create..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[44px] max-h-32 py-3 pr-12 resize-none bg-secondary/50 border-border/50 text-sm rounded-xl focus:ring-2 focus:ring-primary/20"
              rows={1}
            />
            <motion.div
              className="absolute right-1.5 top-1.5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                size="icon"
                onClick={handleSubmit}
                disabled={!prompt.trim() || isGenerating}
                className={`h-8 w-8 rounded-lg ${
                  prompt.trim() && !isGenerating
                    ? "bg-gradient-to-r from-primary to-blue-500 text-primary-foreground shadow-lg shadow-primary/30"
                    : ""
                }`}
              >
                <Send className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIChatSidebar;