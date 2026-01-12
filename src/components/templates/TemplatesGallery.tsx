import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layout, 
  Briefcase, 
  FileText, 
  ShoppingBag, 
  Image, 
  Calendar,
  Check,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  html: string;
  css: string;
  preview: string;
}

const templates: Template[] = [
  {
    id: "landing-saas",
    name: "SaaS Landing",
    description: "Modern SaaS landing page with hero, features, and pricing",
    category: "Landing Pages",
    icon: <Layout className="h-5 w-5" />,
    preview: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    html: `<section class="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
  <nav class="flex justify-between items-center p-6 max-w-7xl mx-auto">
    <div class="text-2xl font-bold">Brand</div>
    <div class="flex gap-6"><a href="#" class="hover:opacity-80">Features</a><a href="#" class="hover:opacity-80">Pricing</a><a href="#" class="hover:opacity-80">About</a></div>
    <button class="bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-opacity-90">Get Started</button>
  </nav>
  <div class="max-w-7xl mx-auto px-6 py-24 text-center">
    <h1 class="text-6xl font-bold mb-6">Build faster with AI</h1>
    <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">The most powerful platform to create websites without code. Let AI do the heavy lifting.</p>
    <div class="flex gap-4 justify-center">
      <button class="bg-white text-indigo-600 px-8 py-4 rounded-xl font-medium text-lg hover:bg-opacity-90">Start Free Trial</button>
      <button class="border-2 border-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-white hover:bg-opacity-10">Watch Demo</button>
    </div>
  </div>
</section>
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-6">
    <h2 class="text-4xl font-bold text-center text-gray-900 mb-16">Powerful Features</h2>
    <div class="grid md:grid-cols-3 gap-8">
      <div class="p-8 rounded-2xl bg-gray-50 text-center">
        <div class="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6"><span class="text-3xl">⚡</span></div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
        <p class="text-gray-600">Build and deploy in minutes, not hours. Our AI handles the complexity.</p>
      </div>
      <div class="p-8 rounded-2xl bg-gray-50 text-center">
        <div class="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6"><span class="text-3xl">🎨</span></div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">Beautiful Design</h3>
        <p class="text-gray-600">Professional templates that look stunning on every device.</p>
      </div>
      <div class="p-8 rounded-2xl bg-gray-50 text-center">
        <div class="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6"><span class="text-3xl">🔒</span></div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">Secure & Reliable</h3>
        <p class="text-gray-600">Enterprise-grade security with 99.9% uptime guarantee.</p>
      </div>
    </div>
  </div>
</section>`,
    css: "",
  },
  {
    id: "portfolio",
    name: "Creative Portfolio",
    description: "Showcase your work with this minimal portfolio template",
    category: "Portfolio",
    icon: <Briefcase className="h-5 w-5" />,
    preview: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    html: `<section class="min-h-screen bg-gray-900 text-white">
  <nav class="flex justify-between items-center p-8 max-w-6xl mx-auto">
    <div class="text-xl font-light tracking-widest">PORTFOLIO</div>
    <div class="flex gap-8 text-sm tracking-wide"><a href="#" class="hover:text-gray-400">Work</a><a href="#" class="hover:text-gray-400">About</a><a href="#" class="hover:text-gray-400">Contact</a></div>
  </nav>
  <div class="max-w-6xl mx-auto px-8 py-32">
    <p class="text-gray-400 mb-4">Hello, I'm</p>
    <h1 class="text-7xl font-bold mb-6">Alex Designer</h1>
    <p class="text-xl text-gray-400 max-w-xl mb-12">Creative director and visual designer crafting beautiful digital experiences for forward-thinking brands.</p>
    <button class="border border-white px-8 py-3 hover:bg-white hover:text-gray-900 transition-colors">View My Work</button>
  </div>
  <div class="max-w-6xl mx-auto px-8 pb-24">
    <div class="grid md:grid-cols-2 gap-8">
      <div class="aspect-video bg-gray-800 rounded-xl overflow-hidden group cursor-pointer">
        <div class="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold">Project 01</div>
      </div>
      <div class="aspect-video bg-gray-800 rounded-xl overflow-hidden group cursor-pointer">
        <div class="w-full h-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-2xl font-bold">Project 02</div>
      </div>
    </div>
  </div>
</section>`,
    css: "",
  },
  {
    id: "blog",
    name: "Modern Blog",
    description: "Clean blog layout with featured posts and articles",
    category: "Blog",
    icon: <FileText className="h-5 w-5" />,
    preview: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    html: `<section class="min-h-screen bg-gray-50">
  <nav class="bg-white border-b">
    <div class="flex justify-between items-center p-6 max-w-5xl mx-auto">
      <div class="text-2xl font-serif font-bold text-gray-900">The Blog</div>
      <div class="flex gap-6 text-gray-600"><a href="#" class="hover:text-gray-900">Articles</a><a href="#" class="hover:text-gray-900">Categories</a><a href="#" class="hover:text-gray-900">About</a></div>
    </div>
  </nav>
  <div class="max-w-5xl mx-auto px-6 py-16">
    <div class="bg-white rounded-2xl overflow-hidden shadow-sm mb-12">
      <div class="h-80 bg-gradient-to-br from-orange-400 to-pink-500"></div>
      <div class="p-8">
        <span class="text-sm text-orange-500 font-medium">Featured</span>
        <h2 class="text-3xl font-serif font-bold text-gray-900 mt-2 mb-4">The Future of Web Design: AI and Beyond</h2>
        <p class="text-gray-600 mb-4">Discover how artificial intelligence is revolutionizing the way we create and design websites...</p>
        <div class="flex items-center gap-3 text-sm text-gray-500"><span>Jan 15, 2024</span><span>•</span><span>5 min read</span></div>
      </div>
    </div>
    <div class="grid md:grid-cols-2 gap-8">
      <div class="bg-white rounded-xl overflow-hidden shadow-sm">
        <div class="h-48 bg-gradient-to-br from-blue-400 to-cyan-500"></div>
        <div class="p-6"><h3 class="font-serif font-bold text-xl text-gray-900 mb-2">Design Systems That Scale</h3><p class="text-gray-600 text-sm">Building consistent UI across platforms...</p></div>
      </div>
      <div class="bg-white rounded-xl overflow-hidden shadow-sm">
        <div class="h-48 bg-gradient-to-br from-green-400 to-emerald-500"></div>
        <div class="p-6"><h3 class="font-serif font-bold text-xl text-gray-900 mb-2">Performance Optimization Tips</h3><p class="text-gray-600 text-sm">Speed up your website load times...</p></div>
      </div>
    </div>
  </div>
</section>`,
    css: "",
  },
  {
    id: "ecommerce",
    name: "E-commerce Store",
    description: "Product showcase with hero and product grid",
    category: "E-commerce",
    icon: <ShoppingBag className="h-5 w-5" />,
    preview: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    html: `<section class="min-h-screen bg-white">
  <nav class="flex justify-between items-center p-6 max-w-7xl mx-auto border-b">
    <div class="text-2xl font-bold text-gray-900">STORE</div>
    <div class="flex gap-8 text-gray-600"><a href="#" class="hover:text-gray-900">Shop</a><a href="#" class="hover:text-gray-900">Collections</a><a href="#" class="hover:text-gray-900">About</a></div>
    <button class="bg-gray-900 text-white px-6 py-2 rounded-full">Cart (0)</button>
  </nav>
  <div class="max-w-7xl mx-auto px-6 py-16">
    <div class="grid lg:grid-cols-2 gap-12 items-center mb-24">
      <div>
        <span class="text-orange-500 font-medium">New Collection</span>
        <h1 class="text-5xl font-bold text-gray-900 mt-4 mb-6">Summer Essentials 2024</h1>
        <p class="text-gray-600 mb-8">Discover our latest collection designed for the modern lifestyle. Quality meets comfort.</p>
        <button class="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800">Shop Now</button>
      </div>
      <div class="h-96 bg-gradient-to-br from-orange-200 to-pink-200 rounded-3xl"></div>
    </div>
    <h2 class="text-3xl font-bold text-gray-900 mb-8">Popular Products</h2>
    <div class="grid md:grid-cols-4 gap-6">
      <div class="group cursor-pointer">
        <div class="aspect-square bg-gray-100 rounded-2xl mb-4 group-hover:shadow-lg transition-shadow"></div>
        <h3 class="font-medium text-gray-900">Product Name</h3>
        <p class="text-gray-500">$99.00</p>
      </div>
      <div class="group cursor-pointer">
        <div class="aspect-square bg-gray-100 rounded-2xl mb-4 group-hover:shadow-lg transition-shadow"></div>
        <h3 class="font-medium text-gray-900">Product Name</h3>
        <p class="text-gray-500">$149.00</p>
      </div>
      <div class="group cursor-pointer">
        <div class="aspect-square bg-gray-100 rounded-2xl mb-4 group-hover:shadow-lg transition-shadow"></div>
        <h3 class="font-medium text-gray-900">Product Name</h3>
        <p class="text-gray-500">$79.00</p>
      </div>
      <div class="group cursor-pointer">
        <div class="aspect-square bg-gray-100 rounded-2xl mb-4 group-hover:shadow-lg transition-shadow"></div>
        <h3 class="font-medium text-gray-900">Product Name</h3>
        <p class="text-gray-500">$199.00</p>
      </div>
    </div>
  </div>
</section>`,
    css: "",
  },
  {
    id: "gallery",
    name: "Photo Gallery",
    description: "Beautiful image gallery with masonry layout",
    category: "Gallery",
    icon: <Image className="h-5 w-5" />,
    preview: "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)",
    html: `<section class="min-h-screen bg-black text-white">
  <nav class="flex justify-between items-center p-8 max-w-7xl mx-auto">
    <div class="text-xl font-light tracking-widest">GALLERY</div>
    <div class="flex gap-8 text-sm text-gray-400"><a href="#" class="hover:text-white">All</a><a href="#" class="hover:text-white">Nature</a><a href="#" class="hover:text-white">Architecture</a><a href="#" class="hover:text-white">Portrait</a></div>
  </nav>
  <div class="max-w-7xl mx-auto px-8 py-16">
    <div class="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
      <div class="break-inside-avoid bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl h-64"></div>
      <div class="break-inside-avoid bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl h-80"></div>
      <div class="break-inside-avoid bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl h-56"></div>
      <div class="break-inside-avoid bg-gradient-to-br from-orange-600 to-red-500 rounded-xl h-72"></div>
      <div class="break-inside-avoid bg-gradient-to-br from-indigo-600 to-purple-500 rounded-xl h-48"></div>
      <div class="break-inside-avoid bg-gradient-to-br from-teal-600 to-green-500 rounded-xl h-64"></div>
    </div>
  </div>
</section>`,
    css: "",
  },
  {
    id: "event",
    name: "Event Landing",
    description: "Event or conference landing page with countdown",
    category: "Events",
    icon: <Calendar className="h-5 w-5" />,
    preview: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    html: `<section class="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 text-white">
  <nav class="flex justify-between items-center p-6 max-w-7xl mx-auto">
    <div class="text-xl font-bold">EVENT 2024</div>
    <div class="flex gap-6"><a href="#" class="hover:opacity-80">Speakers</a><a href="#" class="hover:opacity-80">Schedule</a><a href="#" class="hover:opacity-80">Tickets</a></div>
  </nav>
  <div class="max-w-4xl mx-auto px-6 py-24 text-center">
    <span class="inline-block px-4 py-2 bg-white/20 rounded-full text-sm mb-6">March 15-17, 2024 • San Francisco</span>
    <h1 class="text-6xl font-bold mb-6">The Future of Technology</h1>
    <p class="text-xl opacity-90 mb-12 max-w-2xl mx-auto">Join 5000+ innovators, developers, and industry leaders for three days of inspiration and learning.</p>
    <div class="flex gap-8 justify-center mb-16">
      <div class="text-center"><div class="text-5xl font-bold">42</div><div class="text-sm opacity-80">Days</div></div>
      <div class="text-center"><div class="text-5xl font-bold">18</div><div class="text-sm opacity-80">Hours</div></div>
      <div class="text-center"><div class="text-5xl font-bold">30</div><div class="text-sm opacity-80">Minutes</div></div>
    </div>
    <button class="bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90">Get Your Ticket</button>
  </div>
</section>`,
    css: "",
  },
];

const categories = ["All", "Landing Pages", "Portfolio", "Blog", "E-commerce", "Gallery", "Events"];

interface TemplatesGalleryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (template: Template) => void;
}

const TemplatesGallery = ({ open, onOpenChange, onSelectTemplate }: TemplatesGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = selectedCategory === "All" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const handleSelect = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate);
      onOpenChange(false);
      setSelectedTemplate(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-border/50 max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b border-border/50">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-primary" />
            Template Gallery
          </DialogTitle>
        </DialogHeader>

        {/* Category Filter */}
        <div className="flex gap-2 py-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid md:grid-cols-3 gap-4 pb-4">
            <AnimatePresence mode="popLayout">
              {filteredTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelectedTemplate(template)}
                  className={`group cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                    selectedTemplate?.id === template.id
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border/50 hover:border-primary/50"
                  }`}
                >
                  {/* Preview */}
                  <div 
                    className="h-36 relative"
                    style={{ background: template.preview }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <span className="text-white text-sm font-medium">Preview</span>
                    </div>
                    {selectedTemplate?.id === template.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="p-4 bg-card">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                        {template.icon}
                      </div>
                      <h3 className="font-semibold text-sm">{template.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            {selectedTemplate ? `Selected: ${selectedTemplate.name}` : "Select a template to get started"}
          </p>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              variant="glow"
              onClick={handleSelect}
              disabled={!selectedTemplate}
            >
              <Sparkles className="h-4 w-4" />
              Use Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatesGallery;
export { templates };
