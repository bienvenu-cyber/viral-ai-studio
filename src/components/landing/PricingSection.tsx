import { motion } from "framer-motion";
import { Check, Zap, Sparkles, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Parfait pour découvrir",
    price: { monthly: 0, yearly: 0 },
    icon: Zap,
    features: ["50 crédits/mois", "3 projets max", "Templates basiques", "Export HTML/CSS"],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Pour les créateurs",
    price: { monthly: 19, yearly: 190 },
    icon: Sparkles,
    popular: true,
    features: ["500 crédits/mois", "Projets illimités", "Domaine personnalisé", "Support prioritaire"],
  },
  {
    id: "business",
    name: "Business",
    description: "Pour les équipes",
    price: { monthly: 49, yearly: 490 },
    icon: Building2,
    features: ["2000 crédits/mois", "Collaboration équipe", "API access", "Support dédié 24/7"],
  },
];

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 px-4 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Tarifs simples et transparents
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Commencez gratuitement, évoluez quand vous êtes prêt.
          </p>

          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Mensuel
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Annuel <span className="text-primary text-xs">-17%</span>
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.price.yearly : plan.price.monthly;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative glass-card rounded-2xl p-6 hover-glow ${
                  plan.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      Populaire
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold">{price}€</span>
                  {price > 0 && (
                    <span className="text-muted-foreground">/{isYearly ? "an" : "mois"}</span>
                  )}
                </div>

                <Link to={plan.id === "free" ? "/auth" : "/pricing"}>
                  <Button
                    variant={plan.popular ? "glow" : "outline"}
                    className="w-full mb-6"
                  >
                    {plan.id === "free" ? "Commencer" : "Choisir"}
                  </Button>
                </Link>

                <div className="space-y-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link to="/pricing" className="text-primary hover:underline inline-flex items-center gap-1">
            Voir tous les détails
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
