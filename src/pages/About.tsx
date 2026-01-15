import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  Zap, 
  Target, 
  BookOpen, 
  Lightbulb, 
  Users, 
  Award,
  Globe
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/landing/Footer";

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Lightbulb,
      title: t("pages.about.values.innovation"),
      description: t("pages.about.values.innovationDesc"),
    },
    {
      icon: Users,
      title: t("pages.about.values.accessibility"),
      description: t("pages.about.values.accessibilityDesc"),
    },
    {
      icon: Award,
      title: t("pages.about.values.quality"),
      description: t("pages.about.values.qualityDesc"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              À propos
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t("pages.about.title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("pages.about.subtitle")}
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-8 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {t("pages.about.mission.title")}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {t("pages.about.mission.text")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-8 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {t("pages.about.story.title")}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {t("pages.about.story.text")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              {t("pages.about.values.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="glass-card rounded-2xl p-6 text-center hover-glow"
                  >
                    <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Africa Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 glass-card rounded-2xl p-8 text-center bg-gradient-to-br from-primary/5 to-transparent"
          >
            <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Fait pour l'Afrique 🌍</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Viral est conçu spécifiquement pour les besoins des créateurs africains. 
              Paiements en FCFA via Mobile Money, support en français, et une 
              compréhension profonde des défis locaux.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
