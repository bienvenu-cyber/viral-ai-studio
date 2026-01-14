import { motion } from "framer-motion";
import { Sparkles, MousePointer, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Sparkles,
    title: "Décrivez votre vision",
    description: "Expliquez en quelques mots le site que vous souhaitez créer. Notre IA comprend vos besoins.",
  },
  {
    number: "02",
    icon: MousePointer,
    title: "Personnalisez le design",
    description: "Utilisez l'éditeur drag-and-drop pour ajuster chaque élément selon vos préférences.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Publiez en un clic",
    description: "Exportez votre site vers GitHub ou déployez-le instantanément sur votre domaine.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
            Comment ça marche
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Créez en 3 étapes simples
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            De l'idée au site en ligne, en quelques minutes seulement.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative text-center"
              >
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  <div className="relative w-20 h-20 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
