import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  Check, 
  Zap, 
  Sparkles, 
  Building2, 
  ArrowRight,
  Crown,
  Users,
  Infinity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { useCredits } from "@/hooks/useCredits";
import Navbar from "@/components/layout/Navbar";

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Parfait pour découvrir Viral",
    price: { monthly: 0, yearly: 0 },
    icon: Zap,
    color: "text-muted-foreground",
    bgColor: "bg-secondary/50",
    features: [
      "50 crédits/mois",
      "3 projets max",
      "Templates basiques",
      "Export HTML/CSS",
      "Support communauté",
    ],
    limitations: [
      "Pas de domaine personnalisé",
      "Badge Viral sur les sites",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Pour les créateurs sérieux",
    price: { monthly: 19, yearly: 190 },
    icon: Sparkles,
    color: "text-primary",
    bgColor: "bg-primary/10",
    popular: true,
    features: [
      "500 crédits/mois",
      "Projets illimités",
      "Tous les templates",
      "Domaine personnalisé",
      "Intégration GitHub",
      "Support prioritaire",
      "Analytics basiques",
      "Pas de badge Viral",
    ],
    limitations: [],
  },
  {
    id: "business",
    name: "Business",
    description: "Pour les équipes et agences",
    price: { monthly: 49, yearly: 490 },
    icon: Building2,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    features: [
      "2000 crédits/mois",
      "Projets illimités",
      "Templates premium",
      "Collaboration équipe",
      "API access",
      "White-label",
      "Analytics avancés",
      "Support dédié 24/7",
      "SSO / SAML",
    ],
    limitations: [],
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { isAuthenticated } = useAuth();
  const { credits } = useCredits();
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    
    if (planId === "free") {
      navigate("/dashboard");
      return;
    }
    
    navigate(`/checkout?plan=${planId}&billing=${isYearly ? "yearly" : "monthly"}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
              <Crown className="h-4 w-4" />
              Pricing
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Choisissez votre plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des tarifs simples et transparents. Commencez gratuitement, évoluez quand vous êtes prêt.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                Mensuel
              </span>
              <Switch 
                checked={isYearly} 
                onCheckedChange={setIsYearly}
              />
              <span className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                Annuel
                <span className="ml-2 text-xs text-primary font-medium">-17%</span>
              </span>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = isYearly ? plan.price.yearly : plan.price.monthly;
              const isCurrentPlan = credits.plan === plan.id;
              
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative glass-card rounded-2xl p-6 ${
                    plan.popular ? "ring-2 ring-primary" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        Plus populaire
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <div className={`inline-flex p-3 rounded-xl ${plan.bgColor} mb-4`}>
                      <Icon className={`h-6 w-6 ${plan.color}`} />
                    </div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{price}€</span>
                      {price > 0 && (
                        <span className="text-muted-foreground">
                          /{isYearly ? "an" : "mois"}
                        </span>
                      )}
                    </div>
                    {isYearly && price > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        soit {Math.round(price / 12)}€/mois
                      </p>
                    )}
                  </div>

                  <Button
                    variant={plan.popular ? "glow" : "outline"}
                    className="w-full mb-6"
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Plan actuel
                      </>
                    ) : plan.id === "free" ? (
                      "Commencer gratuitement"
                    ) : (
                      <>
                        Passer à {plan.name}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation) => (
                      <div key={limitation} className="flex items-start gap-2 text-muted-foreground">
                        <span className="h-4 w-4 shrink-0 text-center">–</span>
                        <span className="text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Enterprise CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 glass-card rounded-2xl p-8 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Besoin d'un plan personnalisé ?</h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Pour les grandes équipes et les besoins spécifiques, contactez-nous pour un plan sur mesure.
            </p>
            <Button variant="outline" size="lg">
              Contacter l'équipe commerciale
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>

          {/* FAQ Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground">
              Des questions ? Consultez notre{" "}
              <Link to="/#faq" className="text-primary hover:underline">
                FAQ
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
