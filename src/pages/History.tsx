import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Clock,
  RotateCcw,
  Check,
  Calendar,
  Save,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";

// Mock history data
const mockHistory = [
  {
    id: "v1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
    type: "auto",
    description: "Sauvegarde automatique",
    preview: "Modification du header",
    isCurrent: true,
  },
  {
    id: "v2",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    type: "manual",
    description: "Sauvegarde manuelle",
    preview: "Ajout de la section hero",
    isCurrent: false,
  },
  {
    id: "v3",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    type: "ai",
    description: "Génération IA",
    preview: "Création de la page d'accueil",
    isCurrent: false,
  },
  {
    id: "v4",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    type: "manual",
    description: "Sauvegarde manuelle",
    preview: "Configuration initiale",
    isCurrent: false,
  },
];

const History = () => {
  const { t } = useTranslation();
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [restoring, setRestoring] = useState(false);

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    return `Il y a ${diffDays}j`;
  };

  const handleRestore = async (versionId: string) => {
    setRestoring(true);
    setSelectedVersion(versionId);

    // Mock restore
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Version restaurée avec succès !");
    setRestoring(false);
    navigate(`/editor/${projectId}`);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ai":
        return <Sparkles className="h-4 w-4 text-primary" />;
      case "manual":
        return <Save className="h-4 w-4 text-blue-400" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "ai":
        return (
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            IA
          </Badge>
        );
      case "manual":
        return (
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-400">
            Manuel
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">Auto</Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/editor/${projectId}`)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <Clock className="h-8 w-8 text-primary" />
                  {t("history.title")}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {t("history.subtitle")}
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="glass-card rounded-2xl p-6">
              {mockHistory.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">{t("history.noHistory")}</p>
                </div>
              ) : (
                <ScrollArea className="h-[500px] pr-4">
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

                    {/* Timeline items */}
                    <div className="space-y-6">
                      {mockHistory.map((version, index) => (
                        <motion.div
                          key={version.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`relative flex gap-4 ${
                            selectedVersion === version.id ? "opacity-50" : ""
                          }`}
                        >
                          {/* Timeline dot */}
                          <div
                            className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 ${
                              version.isCurrent
                                ? "border-primary"
                                : "border-border"
                            }`}
                          >
                            {getTypeIcon(version.type)}
                          </div>

                          {/* Content */}
                          <div
                            className={`flex-1 p-4 rounded-xl transition-colors ${
                              version.isCurrent
                                ? "bg-primary/5 border border-primary/20"
                                : "bg-secondary/30 hover:bg-secondary/50"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {getTypeBadge(version.type)}
                                  {version.isCurrent && (
                                    <Badge
                                      variant="outline"
                                      className="text-green-500 border-green-500/30"
                                    >
                                      <Check className="h-3 w-3 mr-1" />
                                      {t("history.current")}
                                    </Badge>
                                  )}
                                </div>
                                <h3 className="font-medium">
                                  {version.description}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {version.preview}
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  <span>
                                    {version.timestamp.toLocaleString("fr-FR")}
                                  </span>
                                  <span>•</span>
                                  <span>{formatRelativeTime(version.timestamp)}</span>
                                </div>
                              </div>

                              {!version.isCurrent && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRestore(version.id)}
                                  disabled={restoring}
                                >
                                  {restoring && selectedVersion === version.id ? (
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                  ) : (
                                    <>
                                      <RotateCcw className="h-4 w-4 mr-2" />
                                      {t("history.restore")}
                                    </>
                                  )}
                                </Button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default History;
