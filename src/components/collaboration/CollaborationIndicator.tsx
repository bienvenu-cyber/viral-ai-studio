import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Circle, Crown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { pb, isConfigured } from "@/services/pocketbase";

interface Collaborator {
  id: string;
  name: string;
  avatar?: string;
  color: string;
  isOwner: boolean;
  isOnline: boolean;
  cursor?: { x: number; y: number };
}

interface CollaborationIndicatorProps {
  projectId: string;
}

const colors = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#06b6d4", // cyan
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
];

const CollaborationIndicator = ({ projectId }: CollaborationIndicatorProps) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Mock collaborators for demo (will be replaced with real-time sync)
    const mockCollaborators: Collaborator[] = [
      {
        id: "1",
        name: "You",
        color: colors[0],
        isOwner: true,
        isOnline: true,
      },
    ];

    setCollaborators(mockCollaborators);

    // If PocketBase is configured, set up real-time subscription
    if (isConfigured() && projectId) {
      // Subscribe to project changes for real-time collaboration
      // This would be implemented with PocketBase realtime subscriptions
      const setupRealtime = async () => {
        try {
          // pb.collection('project_sessions').subscribe('*', (e) => {
          //   // Handle real-time updates
          // });
        } catch (error) {
          console.error("Failed to setup realtime:", error);
        }
      };

      setupRealtime();

      return () => {
        // pb.collection('project_sessions').unsubscribe('*');
      };
    }
  }, [projectId]);

  const onlineCount = collaborators.filter((c) => c.isOnline).length;

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        {/* Avatars Stack */}
        <div 
          className="flex items-center -space-x-2 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <AnimatePresence mode="popLayout">
            {collaborators.slice(0, 4).map((collaborator, index) => (
              <Tooltip key={collaborator.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ scale: 0, x: -20 }}
                    animate={{ scale: 1, x: 0 }}
                    exit={{ scale: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                    style={{ zIndex: collaborators.length - index }}
                  >
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src={collaborator.avatar} />
                      <AvatarFallback
                        style={{ backgroundColor: collaborator.color }}
                        className="text-white text-xs font-medium"
                      >
                        {collaborator.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* Online indicator */}
                    {collaborator.isOnline && (
                      <span 
                        className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background"
                        style={{ backgroundColor: "#22c55e" }}
                      />
                    )}
                    
                    {/* Owner crown */}
                    {collaborator.isOwner && (
                      <span className="absolute -top-1 -right-1 text-yellow-500">
                        <Crown className="h-3 w-3" />
                      </span>
                    )}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="glass-card">
                  <div className="flex items-center gap-2">
                    <Circle
                      className="h-2 w-2"
                      fill={collaborator.isOnline ? "#22c55e" : "#6b7280"}
                      stroke="none"
                    />
                    <span>{collaborator.name}</span>
                    {collaborator.isOwner && (
                      <span className="text-xs text-muted-foreground">(Owner)</span>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </AnimatePresence>

          {/* Overflow indicator */}
          {collaborators.length > 4 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="h-8 w-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground"
            >
              +{collaborators.length - 4}
            </motion.div>
          )}
        </div>

        {/* Online count badge */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-secondary/50 text-xs">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">{onlineCount}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="glass-card">
            {onlineCount} collaborator{onlineCount !== 1 ? "s" : ""} online
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default CollaborationIndicator;
