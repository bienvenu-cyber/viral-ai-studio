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

  // Get prompt from navigation state
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
        blocks: [
          {
            id: "section",
            label: "Section",
            category: "Layout",
            content: `<section class="py-16 px-4 bg-gray-900">
              <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold text-white mb-4">Section Title</h2>
                <p class="text-gray-400">Add your content here.</p>
              </div>
            </section>`,
          },
          {
            id: "hero",
            label: "Hero",
            category: "Sections",
            content: `<section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
              <div class="text-center max-w-4xl mx-auto">
                <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">Build Something Amazing</h1>
                <p class="text-xl text-gray-400 mb-8">Create stunning websites with AI-powered design tools.</p>
                <button class="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition">Get Started</button>
              </div>
            </section>`,
          },
          {
            id: "features",
            label: "Features",
            category: "Sections",
            content: `<section class="py-20 px-4 bg-gray-800">
              <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold text-center text-white mb-12">Features</h2>
                <div class="grid md:grid-cols-3 gap-8">
                  <div class="p-6 bg-gray-900 rounded-xl border border-gray-700">
                    <div class="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                      <span class="text-cyan-500">✨</span>
                    </div>
                    <h3 class="text-xl font-semibold text-white mb-2">Feature One</h3>
                    <p class="text-gray-400">Description of this amazing feature.</p>
                  </div>
                  <div class="p-6 bg-gray-900 rounded-xl border border-gray-700">
                    <div class="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                      <span class="text-cyan-500">🚀</span>
                    </div>
                    <h3 class="text-xl font-semibold text-white mb-2">Feature Two</h3>
                    <p class="text-gray-400">Description of this amazing feature.</p>
                  </div>
                  <div class="p-6 bg-gray-900 rounded-xl border border-gray-700">
                    <div class="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                      <span class="text-cyan-500">⚡</span>
                    </div>
                    <h3 class="text-xl font-semibold text-white mb-2">Feature Three</h3>
                    <p class="text-gray-400">Description of this amazing feature.</p>
                  </div>
                </div>
              </div>
            </section>`,
          },
        ],
      },
    });

    setEditor(grapesjsEditor);

    // Load initial content if prompt exists
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
      // Simulate AI generation (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate mock HTML based on prompt and type
      const generatedHtml = generateMockHTML(prompt, type);

      // Add the generated component to the canvas
      activeEditor.addComponents(generatedHtml);

      toast.success("AI content generated successfully!");
    } catch (error) {
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockHTML = (prompt: string, type: string): string => {
    // This would be replaced with actual AI-generated content
    const templates: Record<string, string> = {
      hero: `<section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.1),transparent_50%)]"></div>
        <div class="text-center max-w-4xl mx-auto relative z-10">
          <span class="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-6">AI-Powered Design</span>
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">${prompt || "Build Something Amazing"}</h1>
          <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">Create stunning websites with AI-powered design tools. No coding required.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition shadow-lg shadow-cyan-500/25">Get Started Free</button>
            <button class="px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition border border-gray-700">Watch Demo</button>
          </div>
        </div>
      </section>`,
      features: `<section class="py-24 px-4 bg-gray-900">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p class="text-gray-400 max-w-2xl mx-auto">Everything you need to build stunning websites</p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="group p-8 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
              <div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span class="text-2xl">🎨</span>
              </div>
              <h3 class="text-xl font-semibold text-white mb-3">AI Design</h3>
              <p class="text-gray-400">Let AI create beautiful designs tailored to your brand.</p>
            </div>
            <div class="group p-8 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
              <div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span class="text-2xl">⚡</span>
              </div>
              <h3 class="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
              <p class="text-gray-400">Optimized for speed with best-in-class performance.</p>
            </div>
            <div class="group p-8 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
              <div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span class="text-2xl">🚀</span>
              </div>
              <h3 class="text-xl font-semibold text-white mb-3">One-Click Deploy</h3>
              <p class="text-gray-400">Deploy to your favorite platform with a single click.</p>
            </div>
          </div>
        </div>
      </section>`,
      pricing: `<section class="py-24 px-4 bg-gray-800">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">Simple Pricing</h2>
            <p class="text-gray-400">Choose the plan that works for you</p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="p-8 bg-gray-900 rounded-2xl border border-gray-700">
              <h3 class="text-xl font-semibold text-white mb-2">Starter</h3>
              <div class="text-4xl font-bold text-white mb-6">$0<span class="text-lg font-normal text-gray-400">/mo</span></div>
              <ul class="space-y-3 mb-8">
                <li class="text-gray-400 flex items-center gap-2"><span class="text-cyan-500">✓</span> 3 projects</li>
                <li class="text-gray-400 flex items-center gap-2"><span class="text-cyan-500">✓</span> Basic AI features</li>
                <li class="text-gray-400 flex items-center gap-2"><span class="text-cyan-500">✓</span> Community support</li>
              </ul>
              <button class="w-full py-3 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition">Get Started</button>
            </div>
            <div class="p-8 bg-gradient-to-b from-cyan-500/10 to-transparent rounded-2xl border border-cyan-500/50 relative">
              <span class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan-500 text-white text-sm font-medium rounded-full">Popular</span>
              <h3 class="text-xl font-semibold text-white mb-2">Pro</h3>
              <div class="text-4xl font-bold text-white mb-6">$29<span class="text-lg font-normal text-gray-400">/mo</span></div>
              <ul class="space-y-3 mb-8">
                <li class="text-gray-300 flex items-center gap-2"><span class="text-cyan-500">✓</span> Unlimited projects</li>
                <li class="text-gray-300 flex items-center gap-2"><span class="text-cyan-500">✓</span> Advanced AI features</li>
                <li class="text-gray-300 flex items-center gap-2"><span class="text-cyan-500">✓</span> Priority support</li>
              </ul>
              <button class="w-full py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition shadow-lg shadow-cyan-500/25">Get Started</button>
            </div>
            <div class="p-8 bg-gray-900 rounded-2xl border border-gray-700">
              <h3 class="text-xl font-semibold text-white mb-2">Enterprise</h3>
              <div class="text-4xl font-bold text-white mb-6">Custom</div>
              <ul class="space-y-3 mb-8">
                <li class="text-gray-400 flex items-center gap-2"><span class="text-cyan-500">✓</span> Everything in Pro</li>
                <li class="text-gray-400 flex items-center gap-2"><span class="text-cyan-500">✓</span> Custom integrations</li>
                <li class="text-gray-400 flex items-center gap-2"><span class="text-cyan-500">✓</span> Dedicated support</li>
              </ul>
              <button class="w-full py-3 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>`,
      testimonials: `<section class="py-24 px-4 bg-gray-900">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">Loved by Creators</h2>
            <p class="text-gray-400">See what our users have to say</p>
          </div>
          <div class="grid md:grid-cols-2 gap-8">
            <div class="p-8 bg-gray-800/50 rounded-2xl border border-gray-700">
              <p class="text-gray-300 mb-6 text-lg">"This tool has completely transformed how I build websites. The AI features are incredible!"</p>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full"></div>
                <div>
                  <div class="font-semibold text-white">Sarah Chen</div>
                  <div class="text-gray-400 text-sm">Freelance Designer</div>
                </div>
              </div>
            </div>
            <div class="p-8 bg-gray-800/50 rounded-2xl border border-gray-700">
              <p class="text-gray-300 mb-6 text-lg">"I built my entire startup's website in under an hour. Absolutely game-changing."</p>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                <div>
                  <div class="font-semibold text-white">Alex Rivera</div>
                  <div class="text-gray-400 text-sm">Startup Founder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`,
      footer: `<footer class="py-12 px-4 bg-gray-900 border-t border-gray-800">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div class="text-xl font-bold text-white mb-4">Viral</div>
              <p class="text-gray-400 text-sm">Build stunning websites with AI-powered design tools.</p>
            </div>
            <div>
              <h4 class="font-semibold text-white mb-4">Product</h4>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-white mb-4">Company</h4>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-400 hover:text-white transition">About</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-white mb-4">Legal</h4>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-400 hover:text-white transition">Privacy</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div class="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            © 2024 Viral. All rights reserved.
          </div>
        </div>
      </footer>`,
      section: `<section class="py-20 px-4 bg-gray-800">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">${prompt}</h2>
          <p class="text-gray-400 text-lg">This section was generated based on your prompt. Edit it to match your needs.</p>
        </div>
      </section>`,
    };

    return templates[type] || templates.section;
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
