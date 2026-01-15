import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/landing/Footer";

const Terms = () => {
  const { t } = useTranslation();

  const sections = [
    "acceptance",
    "services",
    "accounts",
    "payment",
    "intellectual",
    "termination",
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
                <FileText className="h-4 w-4" />
                Légal
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {t("pages.terms.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("pages.terms.lastUpdated", { date: "15 janvier 2026" })}
              </p>
            </div>

            {/* Content */}
            <div className="glass-card rounded-2xl p-8 space-y-8">
              {sections.map((section) => (
                <div key={section}>
                  <h2 className="text-xl font-bold mb-3">
                    {t(`pages.terms.sections.${section}.title`)}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`pages.terms.sections.${section}.content`)}
                  </p>
                </div>
              ))}

              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Pour toute question concernant ces conditions, contactez-nous à{" "}
                  <a
                    href="mailto:legal@viral.africa"
                    className="text-primary hover:underline"
                  >
                    legal@viral.africa
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
