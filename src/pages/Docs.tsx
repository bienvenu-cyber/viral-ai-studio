import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/landing/Footer";

const Docs = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: "Démarrage rapide",
      articles: [
        "Introduction à Viral",
        "Créer votre premier site",
        "Comprendre les crédits",
      ],
    },
    {
      title: "Guide de l'éditeur",
      articles: [
        "Interface utilisateur",
        "Blocs et composants",
        "Styles et personnalisation",
        "Mode responsive",
      ],
    },
    {
      title: "IA et génération",
      articles: [
        "Prompts efficaces",
        "Types de contenu",
        "Optimiser les résultats",
      ],
    },
    {
      title: "Publication",
      articles: [
        "Exporter en ZIP",
        "Intégration GitHub",
        "Domaines personnalisés",
      ],
    },
    {
      title: "API",
      articles: [
        "Authentification",
        "Endpoints disponibles",
        "Limites et quotas",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
                <BookOpen className="h-4 w-4" />
                Documentation
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {t("pages.docs.title")}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t("pages.docs.subtitle")}
              </p>
            </div>

            {/* Documentation Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <h2 className="font-bold mb-4">{section.title}</h2>
                  <ul className="space-y-2">
                    {section.articles.map((article) => (
                      <li key={article}>
                        <a
                          href="#"
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                        >
                          <span className="text-primary">→</span>
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* API Reference CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 glass-card rounded-2xl p-8 text-center"
            >
              <h3 className="text-xl font-bold mb-2">Référence API complète</h3>
              <p className="text-muted-foreground mb-4">
                Explorez notre API pour intégrer Viral dans vos applications
              </p>
              <Button variant="outline">
                Voir la référence API
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Docs;
