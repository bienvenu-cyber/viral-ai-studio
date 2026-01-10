import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import ProjectCard from "@/components/dashboard/ProjectCard";
import CreateProjectModal from "@/components/dashboard/CreateProjectModal";

// Mock data
const mockProjects = [
  {
    id: "1",
    name: "Startup Landing",
    description: "Modern SaaS landing page with hero section",
    updatedAt: "2 hours ago",
    isPublished: true,
  },
  {
    id: "2",
    name: "Portfolio Site",
    description: "Personal portfolio with project showcase",
    updatedAt: "1 day ago",
    isPublished: false,
  },
  {
    id: "3",
    name: "E-commerce Store",
    description: "Online store with product listings",
    updatedAt: "3 days ago",
    isPublished: true,
  },
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredProjects = mockProjects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your Projects
          </h1>
          <p className="text-muted-foreground">
            Build, edit, and publish websites with AI
          </p>
        </motion.div>

        {/* Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="glow"
            onClick={() => setIsCreateModalOpen(true)}
            className="shrink-0"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <Zap className="h-16 w-16 text-primary relative" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first AI-powered website in seconds
            </p>
            <Button variant="glow" onClick={() => setIsCreateModalOpen(true)}>
              <Sparkles className="h-4 w-4" />
              Create Your First Project
            </Button>
          </motion.div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} {...project} index={index} />
            ))}
          </div>
        )}
      </main>

      <CreateProjectModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
};

export default Dashboard;
