import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Sparkles, Bug, Zap, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/landing/Footer";

const Changelog = () => {
  const { t } = useTranslation();

  const releases = [
    {
      version: "1.2.0",
      date: "15 janvier 2026",
      changes: [
        { type: "feature", text: "Support multi-langue (FR/EN/ES)" },
        { type: "feature", text: "Intégration Lygos Pay pour paiements FCFA" },
        { type: "feature", text: "Page historique des versions" },
        { type: "improvement", text: "Amélioration du chat IA" },
      ],
    },
    {
      version: "1.1.0",
      date: "1 janvier 2026",
      changes: [
        { type: "feature", text: "Galerie de templates" },
        { type: "feature", text: "Collaboration en temps réel" },
        { type: "feature", text: "Animation de génération IA" },
        { type: "fix", text: "Correction des exports ZIP" },
      ],
    },
    {
      version: "1.0.0",
      date: "15 décembre 2025",
      changes: [
        { type: "feature", text: "Lancement de Viral" },
        { type: "feature", text: "Éditeur visuel drag-and-drop" },
        { type: "feature", text: "Génération de sites avec IA" },
        { type: "feature", text: "Intégration GitHub" },
      ],
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "feature":
        return <Plus className="h-3 w-3" />;
      case "improvement":
        return <Zap className="h-3 w-3" />;
      case "fix":
        return <Bug className="h-3 w-3" />;
      default:
        return <Sparkles className="h-3 w-3" />;
    }
  };

  const getBadge = (type: string) => {
    switch (type) {
      case "feature":
        return (
          <Badge variant="secondary" className="bg-green-500/10 text-green-500">
            {getIcon(type)}
            <span className="ml-1">Nouveau</span>
          </Badge>
        );
      case "improvement":
        return (
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-400">
            {getIcon(type)}
            <span className="ml-1">Amélioration</span>
          </Badge>
        );
      case "fix":
        return (
          <Badge variant="secondary" className="bg-orange-500/10 text-orange-400">
            {getIcon(type)}
            <span className="ml-1">Correction</span>
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                Changelog
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {t("pages.changelog.title")}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t("pages.changelog.subtitle")}
              </p>
            </div>

            {/* Releases */}
            <div className="space-y-8">
              {releases.map((release, index) => (
                <motion.div
                  key={release.version}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="text-primary border-primary">
                      v{release.version}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {release.date}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {release.changes.map((change, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3"
                      >
                        {getBadge(change.type)}
                        <span className="text-sm">{change.text}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Changelog;
