import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/landing/Footer";

const Careers = () => {
  const { t } = useTranslation();

  // No open positions for now
  const openPositions: Array<{
    title: string;
    location: string;
    type: string;
    department: string;
  }> = [];

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
                <Briefcase className="h-4 w-4" />
                Carrières
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {t("pages.careers.title")}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("pages.careers.intro")}
              </p>
            </div>

            {/* Open Positions or Empty State */}
            {openPositions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-2xl p-12 text-center"
              >
                <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-50" />
                <h3 className="text-xl font-bold mb-2">Aucun poste ouvert</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {t("pages.careers.noPositions")}
                </p>
                <Button variant="outline" asChild>
                  <a href="mailto:careers@viral.africa">
                    Envoyer une candidature spontanée
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {openPositions.map((position, index) => (
                  <motion.div
                    key={position.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card rounded-xl p-6 hover-glow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg">{position.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {position.type}
                          </span>
                          <span>{position.department}</span>
                        </div>
                      </div>
                      <Button variant="outline">
                        Postuler
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Why Join */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12 grid md:grid-cols-3 gap-6"
            >
              {[
                {
                  title: "Impact réel",
                  description: "Contribuez à transformer la création web en Afrique",
                },
                {
                  title: "Équipe passionnée",
                  description: "Travaillez avec des experts en IA et développement",
                },
                {
                  title: "Croissance rapide",
                  description: "Évoluez rapidement dans une startup en pleine expansion",
                },
              ].map((benefit) => (
                <div
                  key={benefit.title}
                  className="glass-card rounded-xl p-6 text-center"
                >
                  <h4 className="font-bold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
