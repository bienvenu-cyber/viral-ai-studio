import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Zap, ArrowRight, Sparkles, Github, Rocket, Layers, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPreview from "@/assets/hero-preview.jpg";
import PricingSection from "@/components/landing/PricingSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import LanguageSelector from "@/components/ui/language-selector";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <nav className="relative z-50 border-b border-border/50 bg-background/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-colors" />
                <Zap className="h-8 w-8 text-primary relative" />
              </div>
              <span className="text-xl font-bold gradient-text">Viral</span>
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <Link to="/pricing">
                <Button variant="ghost">{t("common.pricing")}</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="glow">
                  {t("landing.hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-24 pb-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              {t("landing.hero.badge")}
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            {t("landing.hero.title")} <span className="gradient-text">{t("landing.hero.titleHighlight")}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t("landing.hero.description")}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button variant="glow" size="xl">
                <Sparkles className="h-5 w-5" />
                {t("landing.hero.cta")}
              </Button>
            </Link>
            <Button variant="outline" size="xl">
              <Github className="h-5 w-5" />
              {t("landing.hero.viewGithub")}
            </Button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-20 max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="glass-card p-2 glow-effect">
              <img src={heroPreview} alt="Viral Website Builder Interface" className="w-full rounded-lg" />
            </div>
          </div>
        </motion.div>
      </section>

      <section id="features" className="py-24 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t("landing.features.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("landing.features.subtitle")}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: t("landing.features.ai.title"), description: t("landing.features.ai.description") },
              { icon: Layers, title: t("landing.features.editor.title"), description: t("landing.features.editor.description") },
              { icon: Github, title: t("landing.features.github.title"), description: t("landing.features.github.description") },
              { icon: Rocket, title: t("landing.features.deploy.title"), description: t("landing.features.deploy.description") },
              { icon: Globe, title: t("landing.features.domains.title"), description: t("landing.features.domains.description") },
              { icon: Zap, title: t("landing.features.fast.title"), description: t("landing.features.fast.description") },
            ].map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group glass-card p-6 hover-glow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorksSection />
      <PricingSection />
      <FAQSection />

      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-card p-12 glow-effect relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t("landing.cta.title")}</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t("landing.cta.subtitle")}</p>
              <Link to="/dashboard">
                <Button variant="glow" size="xl">
                  <Sparkles className="h-5 w-5" />
                  {t("landing.cta.button")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
