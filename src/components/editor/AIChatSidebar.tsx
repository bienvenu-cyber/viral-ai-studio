import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  PanelLeftClose, 
  PanelLeft,
  Trash2,
  Copy,
  MoreHorizontal,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { isAIConfigured } from "@/services/ai";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isError?: boolean;
}

interface AIChatSidebarProps {
  onGenerate: (prompt: string, type: string) => Promise<void>;
  isGenerating?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const AIChatSidebar = ({ 
  onGenerate, 
  isGenerating = false, 
  isCollapsed = false,
  onToggleCollapse 
}: AIChatSidebarProps) => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: isAIConfigured() 
        ? "Bonjour ! Je suis votre assistant AI. Décrivez ce que vous voulez créer et je génèrerai le code HTML pour vous. Par exemple: 'Crée une section hero avec un titre accrocheur et un bouton CTA'"
        : "⚠️ L'API AI n'est pas configurée. Veuillez ajouter la clé VITE_AI_API_KEY dans les secrets du projet pour activer la génération AI.",
      timestamp: new Date(),
      isError: !isAIConfigured(),
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
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentPrompt = prompt;
    setPrompt("");

    try {
      await onGenerate(currentPrompt, "section");
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `J'ai ajouté le contenu basé sur votre demande: "${currentPrompt}". Vous pouvez le voir dans le canvas à droite. Voulez-vous que je fasse des modifications ?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Désolé, une erreur s'est produite lors de la génération. Veuillez réessayer.",
        timestamp: new Date(),
        isError: true,
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
        content: "Chat effacé ! Comment puis-je vous aider à créer quelque chose ?",
        timestamp: new Date(),
      },
    ]);
    toast.success("Chat effacé");
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copié dans le presse-papiers");
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
              <h2 className="font-semibold text-sm">Assistant AI</h2>
              <p className="text-xs text-muted-foreground">Powered by Mistral AI</p>
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
                  Effacer le chat
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
          {isAIConfigured() ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-muted-foreground">Prêt à générer</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-3 w-3 text-yellow-500" />
              <span className="text-xs text-yellow-500">API non configurée</span>
            </>
          )}
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
                      ? message.isError 
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-gradient-to-br from-primary to-blue-500 text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {message.role === "assistant" ? (
                    message.isError ? <AlertCircle className="h-4 w-4" /> : <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </motion.div>
                <div className="flex-1 relative">
                  <div
                    className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      message.role === "assistant"
                        ? message.isError 
                          ? "bg-yellow-500/10 border border-yellow-500/20 rounded-tl-sm"
                          : "bg-secondary/80 rounded-tl-sm"
                        : "bg-primary/20 text-foreground rounded-tr-sm"
                    }`}
                  >
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
                <Loader2 className="h-4 w-4 text-primary-foreground animate-spin" />
              </div>
              <div className="flex-1 p-3 rounded-2xl rounded-tl-sm bg-secondary/80">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Génération en cours</span>
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
        {/* Input field */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              placeholder="Décrivez ce que vous voulez créer..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!isAIConfigured()}
              className="min-h-[60px] max-h-32 py-3 pr-12 resize-none bg-secondary/50 border-border/50 text-sm rounded-xl focus:ring-2 focus:ring-primary/20"
              rows={2}
            />
            <motion.div
              className="absolute right-1.5 bottom-1.5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                size="icon"
                onClick={handleSubmit}
                disabled={!prompt.trim() || isGenerating || !isAIConfigured()}
                className={`h-8 w-8 rounded-lg ${
                  prompt.trim() && !isGenerating && isAIConfigured()
                    ? "bg-gradient-to-r from-primary to-blue-500 text-primary-foreground shadow-lg shadow-primary/30"
                    : ""
                }`}
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Hint */}
        <p className="text-xs text-muted-foreground text-center">
          Appuyez sur <kbd className="px-1.5 py-0.5 text-xs bg-secondary rounded">Entrée</kbd> pour générer
        </p>
      </div>
    </motion.div>
  );
};

export default AIChatSidebar;
