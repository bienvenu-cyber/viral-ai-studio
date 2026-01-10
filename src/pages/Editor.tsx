import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import grapesjs, { Editor as GrapesEditor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import {
  ArrowLeft,
  Eye,
  Redo,
  Rocket,
  Save,
  Undo,
  Code,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AIPromptBar from "@/components/editor/AIPromptBar";
import PublishModal from "@/components/editor/PublishModal";
import { generateWithAI } from "@/services/ai";
import { blocks } from "@/config/grapesjs-blocks";

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<GrapesEditor | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isPreview, setIsPreview] = useState(false);

  const initialPrompt = (location.state as any)?.prompt || "";
  const projectName = (location.state as any)?.projectName || "Untitled Project";

  useEffect(() => {
    if (!editorRef.current) return;

    const grapesjsEditor = grapesjs.init({
      container: editorRef.current,
      height: "100%",
      width: "auto",
      storageManager: false,
      panels: { defaults: [] },
      deviceManager: {
        devices: [
          { name: "Desktop", width: "" },
          { name: "Tablet", width: "768px", widthMedia: "992px" },
          { name: "Mobile", width: "320px", widthMedia: "480px" },
        ],
      },
      canvas: {
        styles: [
          "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
        ],
      },
      blockManager: {
        appendTo: "#blocks-panel",
        blocks: blocks.map(b => ({
          id: b.id,
          label: b.label,
          category: b.category,
          content: b.content,
        })),
      },
    });

    setEditor(grapesjsEditor);

    if (initialPrompt) {
      handleAIGenerate(initialPrompt, "section", grapesjsEditor);
    }

    return () => {
      grapesjsEditor.destroy();
    };
  }, []);

  const handleAIGenerate = async (
    prompt: string,
    type: string,
    editorInstance?: GrapesEditor
  ) => {
    const activeEditor = editorInstance || editor;
    if (!activeEditor) return;

    setIsGenerating(true);

    try {
      const result = await generateWithAI({ prompt, type });
      
      if (result.success && result.html) {
        activeEditor.addComponents(result.html);
        toast.success("AI content generated successfully!");
      } else {
        toast.error(result.error || "Failed to generate content");
      }
    } catch (error) {
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const getEditorContent = () => {
    if (!editor) return { html: '', css: '' };
    return {
      html: editor.getHtml(),
      css: editor.getCss(),
    };
  };

  const handleDeviceChange = (newDevice: "desktop" | "tablet" | "mobile") => {
    if (!editor) return;
    setDevice(newDevice);
    const deviceMap = {
      desktop: "Desktop",
      tablet: "Tablet",
      mobile: "Mobile",
    };
    editor.setDevice(deviceMap[newDevice]);
  };

  const handleSave = () => {
    toast.success("Project saved successfully!");
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Editor Toolbar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="h-14 border-b border-border/50 bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 z-50"
      >
        {/* Left Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="h-6 w-px bg-border" />
          <span className="font-medium text-sm">{projectName}</span>
        </div>

        {/* Center - Device Switcher */}
        <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-lg">
          <Button
            variant={device === "desktop" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleDeviceChange("desktop")}
            className="h-8"
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant={device === "tablet" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleDeviceChange("tablet")}
            className="h-8"
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={device === "mobile" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleDeviceChange("mobile")}
            className="h-8"
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor?.UndoManager.undo()}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor?.UndoManager.redo()}
          >
            <Redo className="h-4 w-4" />
          </Button>
          <div className="h-6 w-px bg-border" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPreview(!isPreview)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleSave}>
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="glow" onClick={() => setIsPublishModalOpen(true)}>
            <Rocket className="h-4 w-4" />
            Publish
          </Button>
        </div>
      </motion.header>

      {/* Editor Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Blocks Panel */}
        <div className="w-64 border-r border-border/50 bg-card/50 overflow-y-auto hidden lg:block">
          <div className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Blocks
            </h3>
            <div id="blocks-panel" />
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-muted/30 overflow-hidden relative">
          <div ref={editorRef} className="h-full" />
        </div>
      </div>

      {/* AI Prompt Bar */}
      <AIPromptBar onGenerate={handleAIGenerate} isGenerating={isGenerating} />

      {/* Publish Modal */}
      <PublishModal
        open={isPublishModalOpen}
        onOpenChange={setIsPublishModalOpen}
      />
    </div>
  );
};

export default Editor;
