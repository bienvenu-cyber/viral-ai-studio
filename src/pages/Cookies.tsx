import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Cookie } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/landing/Footer";

const Cookies = () => {
  const { t } = useTranslation();

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
                <Cookie className="h-4 w-4" />
                Cookies
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {t("pages.cookies.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("pages.cookies.lastUpdated", { date: "15 janvier 2026" })}
              </p>
            </div>

            {/* Content */}
            <div className="glass-card rounded-2xl p-8 space-y-8">
              <p className="text-muted-foreground leading-relaxed">
                {t("pages.cookies.intro")}
              </p>

              <div>
                <h2 className="text-xl font-bold mb-3">
                  {t("pages.cookies.what.title")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("pages.cookies.what.content")}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">
                  {t("pages.cookies.types.title")}
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {t("pages.cookies.types.essential")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {t("pages.cookies.types.analytics")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {t("pages.cookies.types.preferences")}
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">
                  {t("pages.cookies.manage.title")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("pages.cookies.manage.content")}
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

export default Cookies;
