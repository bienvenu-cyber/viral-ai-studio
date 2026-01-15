import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Users, MessageCircle, Twitter, Github, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/landing/Footer";

const Community = () => {
  const { t } = useTranslation();

  const communities = [
    {
      name: "Discord",
      description: "Rejoignez notre serveur Discord pour discuter avec la communauté",
      icon: MessageCircle,
      color: "bg-indigo-500/10 text-indigo-400",
      href: "https://discord.gg/viral",
      cta: t("pages.community.discord"),
      members: "2.5K+",
    },
    {
      name: "Twitter/X",
      description: "Suivez-nous pour les dernières actualités et astuces",
      icon: Twitter,
      color: "bg-sky-500/10 text-sky-400",
      href: "https://twitter.com/viral",
      cta: t("pages.community.twitter"),
      members: "5K+",
    },
    {
      name: "GitHub",
      description: "Contribuez au projet et signalez des bugs",
      icon: Github,
      color: "bg-gray-500/10 text-gray-400",
      href: "https://github.com/viral",
      cta: "Voir sur GitHub",
      members: "500+",
    },
    {
      name: "YouTube",
      description: "Tutoriels vidéo et démonstrations",
      icon: Youtube,
      color: "bg-red-500/10 text-red-400",
      href: "https://youtube.com/@viral",
      cta: "S'abonner",
      members: "1K+",
    },
  ];

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
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
                <Users className="h-4 w-4" />
                Communauté
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {t("pages.community.title")}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t("pages.community.subtitle")}
              </p>
            </div>

            {/* Community Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {communities.map((community, index) => {
                const Icon = community.icon;
                return (
                  <motion.a
                    key={community.name}
                    href={community.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card rounded-2xl p-6 hover-glow group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${community.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold">{community.name}</h3>
                          <span className="text-xs text-muted-foreground">
                            {community.members} membres
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {community.description}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        >
                          {community.cta}
                        </Button>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 glass-card rounded-2xl p-8"
            >
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary">10K+</p>
                  <p className="text-sm text-muted-foreground">Utilisateurs</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">50K+</p>
                  <p className="text-sm text-muted-foreground">Sites créés</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">25+</p>
                  <p className="text-sm text-muted-foreground">Pays</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
