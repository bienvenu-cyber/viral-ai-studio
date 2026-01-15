import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  CreditCard, 
  Layers, 
  Rocket,
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/landing/Footer";
import { Link } from "react-router-dom";

const Help = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: "getting-started",
      icon: BookOpen,
      title: t("pages.help.categories.gettingStarted"),
      articles: [
        { title: "Créer votre premier projet", slug: "first-project" },
        { title: "Comprendre l'interface", slug: "interface" },
        { title: "Utiliser l'IA", slug: "using-ai" },
      ],
    },
    {
      id: "account",
      icon: CreditCard,
      title: t("pages.help.categories.account"),
      articles: [
        { title: "Gérer votre abonnement", slug: "subscription" },
        { title: "Comprendre les crédits", slug: "credits" },
        { title: "Modifier votre profil", slug: "profile" },
      ],
    },
    {
      id: "editor",
      icon: Layers,
      title: t("pages.help.categories.editor"),
      articles: [
        { title: "Utiliser l'éditeur visuel", slug: "visual-editor" },
        { title: "Ajouter des blocs", slug: "blocks" },
        { title: "Personnaliser les styles", slug: "styles" },
      ],
    },
    {
      id: "publishing",
      icon: Rocket,
      title: t("pages.help.categories.publishing"),
      articles: [
        { title: "Publier sur GitHub", slug: "github" },
        { title: "Exporter votre projet", slug: "export" },
        { title: "Configurer un domaine", slug: "domain" },
      ],
    },
  ];

  const filteredCategories = categories.map((category) => ({
    ...category,
    articles: category.articles.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => 
    searchQuery === "" || category.articles.length > 0
  );

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
                <HelpCircle className="h-4 w-4" />
                Aide
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {t("pages.help.title")}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t("pages.help.subtitle")}
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-12">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("pages.help.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>

            {/* Categories */}
            <div className="grid sm:grid-cols-2 gap-6">
              {filteredCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="font-bold">{category.title}</h2>
                    </div>
                    <div className="space-y-2">
                      {category.articles.map((article) => (
                        <Link
                          key={article.slug}
                          to={`/help/${category.id}/${article.slug}`}
                          className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors group"
                        >
                          <span className="text-sm">{article.title}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 glass-card rounded-2xl p-8 text-center"
            >
              <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Besoin d'aide ?</h3>
              <p className="text-muted-foreground mb-4">
                Notre équipe est disponible pour répondre à vos questions
              </p>
              <Link to="/contact">
                <button className="text-primary hover:underline">
                  Contacter le support →
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
