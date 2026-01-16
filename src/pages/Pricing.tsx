import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  Check, 
  Zap, 
  Sparkles, 
  Building2, 
  ArrowRight,
  Crown,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { useCredits } from "@/hooks/useCredits";
import Navbar from "@/components/layout/Navbar";
import { PLANS_PRICING, formatFCFA } from "@/services/lygos";

const Pricing = () => {
  const { t } = useTranslation();
  const [isYearly, setIsYearly] = useState(false);
  const { isAuthenticated } = useAuth();
  const { credits } = useCredits();
  const navigate = useNavigate();

  const plans = [
    {
      id: "free",
      name: t('pricing.free.name'),
      description: t('pricing.free.description'),
      price: PLANS_PRICING.free,
      icon: Zap,
      color: "text-muted-foreground",
      bgColor: "bg-secondary/50",
      features: t('pricing.free.features', { returnObjects: true }) as string[],
      limitations: [
        "Pas de domaine personnalisé",
        "Badge Viral sur les sites",
      ],
    },
    {
      id: "pro",
      name: t('pricing.pro.name'),
      description: t('pricing.pro.description'),
      price: PLANS_PRICING.pro,
      icon: Sparkles,
      color: "text-primary",
      bgColor: "bg-primary/10",
      popular: true,
      features: t('pricing.pro.features', { returnObjects: true }) as string[],
      limitations: [],
    },
    {
      id: "business",
      name: t('pricing.business.name'),
      description: t('pricing.business.description'),
      price: PLANS_PRICING.business,
      icon: Building2,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      features: t('pricing.business.features', { returnObjects: true }) as string[],
      limitations: [],
    },
  ];

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
              {t('nav.pricing')}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t('pricing.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('pricing.subtitle')}
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {t('pricing.monthly')}
              </span>
              <Switch 
                checked={isYearly} 
                onCheckedChange={setIsYearly}
              />
              <span className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {t('pricing.yearly')}
                <span className="ml-2 text-xs text-primary font-medium">{t('pricing.save')}</span>
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
                        {t('pricing.popular')}
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
                      <span className="text-3xl font-bold">{formatFCFA(price)}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {price > 0 ? (isYearly ? t('pricing.per_year') : t('pricing.per_month')) : ''}
                    </span>
                    {isYearly && price > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        soit {formatFCFA(Math.round(price / 12))}/mois
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
                        {t('pricing.current_plan')}
                      </>
                    ) : plan.id === "free" ? (
                      t('pricing.start_free')
                    ) : (
                      <>
                        {t('pricing.upgrade')}
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
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contacter l'équipe commerciale
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
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
