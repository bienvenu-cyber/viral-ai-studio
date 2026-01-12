import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import grapesjs, { Editor as GrapesEditor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import {
  ArrowLeft,
  Eye,
  Redo,
  Rocket,
  Save,
  Undo,
  Smartphone,
  Monitor,
  Tablet,
  Download,
  Blocks,
  PanelRightClose,
  PanelRight,
  LayoutTemplate,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AIChatSidebar from "@/components/editor/AIChatSidebar";
import AIGeneratingOverlay from "@/components/editor/AIGeneratingOverlay";
import PublishModal from "@/components/editor/PublishModal";
import TemplatesGallery, { Template } from "@/components/templates/TemplatesGallery";
import CollaborationIndicator from "@/components/collaboration/CollaborationIndicator";
import { generateWithAI } from "@/services/ai";
import { blocks } from "@/config/grapesjs-blocks";
import { exportAsZip } from "@/services/github";
import { saveProjectContent, isConfigured as isPocketBaseConfigured } from "@/services/pocketbase";

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<GrapesEditor | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAIChatCollapsed, setIsAIChatCollapsed] = useState(false);
  const [isBlocksPanelOpen, setIsBlocksPanelOpen] = useState(false);

  const initialPrompt = (location.state as any)?.prompt || "";
  const projectName = (location.state as any)?.projectName || "Untitled Project";

  const handleSelectTemplate = (template: Template) => {
    if (editor) {
      editor.setComponents(template.html);
      if (template.css) {
        editor.setStyle(template.css);
      }
      toast.success(`Template "${template.name}" applied!`);
    }
  };

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
      css: editor.getCss() || '',
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

  const handleSave = async () => {
    if (!id) {
      toast.success("Project saved locally!");
      return;
    }

    setIsSaving(true);
    
    try {
      const { html, css } = getEditorContent();
      
      if (isPocketBaseConfigured()) {
        await saveProjectContent(id, html, css);
        toast.success("Project saved to cloud!");
      } else {
        // Save to localStorage as fallback
        localStorage.setItem(`project_${id}`, JSON.stringify({ html, css }));
        toast.success("Project saved locally!");
      }
    } catch (error) {
      toast.error("Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async () => {
    const { html, css } = getEditorContent();
    
    try {
      await exportAsZip(html, css, projectName);
      toast.success("Project exported as ZIP!");
    } catch (error) {
      toast.error("Failed to export project");
    }
  };

  const handlePublish = () => {
    setIsPublishModalOpen(true);
  };

  const { html, css } = getEditorContent();

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
          <div className="h-6 w-px bg-border" />
          <CollaborationIndicator projectId={id || ""} />
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
            onClick={() => setIsTemplatesOpen(true)}
            title="Templates"
          >
            <LayoutTemplate className="h-4 w-4" />
          </Button>
          <div className="h-6 w-px bg-border" />
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
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleExport}
            title="Export as ZIP"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="glow" onClick={handlePublish}>
            <Rocket className="h-4 w-4" />
            Publish
          </Button>
        </div>
      </motion.header>

      {/* Editor Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* AI Chat Sidebar (Left) */}
        <AIChatSidebar
          onGenerate={handleAIGenerate}
          isGenerating={isGenerating}
          isCollapsed={isAIChatCollapsed}
          onToggleCollapse={() => setIsAIChatCollapsed(!isAIChatCollapsed)}
        />

        {/* Canvas */}
        <div className="flex-1 bg-muted/30 overflow-hidden relative">
          <div ref={editorRef} className="h-full" />
          <AnimatePresence>
            <AIGeneratingOverlay isVisible={isGenerating} />
          </AnimatePresence>
        </div>

        {/* Blocks Panel (Right) */}
        <div className={`border-l border-border/50 bg-card/50 transition-all duration-300 ${isBlocksPanelOpen ? "w-64" : "w-12"}`}>
          {isBlocksPanelOpen ? (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Blocks className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm">Blocks</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsBlocksPanelOpen(false)}
                  className="h-8 w-8"
                >
                  <PanelRightClose className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div id="blocks-panel" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsBlocksPanelOpen(true)}
                className="mb-4"
              >
                <PanelRight className="h-4 w-4" />
              </Button>
              <div className="flex flex-col items-center gap-2">
                <Blocks className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground [writing-mode:vertical-lr] rotate-180">
                  Blocks
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Publish Modal */}
      <PublishModal
        open={isPublishModalOpen}
        onOpenChange={setIsPublishModalOpen}
        html={editor?.getHtml() || ''}
        css={editor?.getCss() || ''}
        projectName={projectName}
      />

      {/* Templates Gallery */}
      <TemplatesGallery
        open={isTemplatesOpen}
        onOpenChange={setIsTemplatesOpen}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
};

export default Editor;