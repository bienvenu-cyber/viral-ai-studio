import { motion } from "framer-motion";
import { MoreHorizontal, ExternalLink, Edit, Trash2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  updatedAt: string;
  isPublished?: boolean;
  index?: number;
}

const ProjectCard = ({
  id,
  name,
  description,
  thumbnail,
  updatedAt,
  isPublished,
  index = 0,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group glass-card overflow-hidden hover-glow"
    >
      {/* Thumbnail */}
      <div className="relative h-40 bg-gradient-to-br from-secondary to-muted overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Globe className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Status Badge */}
        {isPublished && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full border border-primary/30">
              Published
            </span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="glass" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card">
              <DropdownMenuItem className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate mb-1">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Updated {updatedAt}
          </span>
          <Link to={`/editor/${id}`}>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
              Open Editor
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
