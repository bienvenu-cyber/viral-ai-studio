import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { 
  CreditCard, 
  Shield, 
  ArrowLeft,
  Loader2,
  Check,
  Lock,
  Sparkles,
  Building2,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useCredits } from "@/hooks/useCredits";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";

const plans = {
  pro: {
    name: "Pro",
    icon: Sparkles,
    color: "text-primary",
    price: { monthly: 19, yearly: 190 },
    features: ["500 crédits/mois", "Projets illimités", "Support prioritaire"],
  },
  business: {
    name: "Business",
    icon: Building2,
    color: "text-purple-400",
    price: { monthly: 49, yearly: 490 },
    features: ["2000 crédits/mois", "Collaboration équipe", "API access"],
  },
};

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { upgradePlan } = useCredits();
  
  const planId = searchParams.get("plan") as "pro" | "business" || "pro";
  const billing = searchParams.get("billing") || "monthly";
  const plan = plans[planId] || plans.pro;
  const isYearly = billing === "yearly";
  const price = isYearly ? plan.price.yearly : plan.price.monthly;

  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !expiry || !cvc || !name) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    
    try {
      // Mock payment processing - replace with real Stripe integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user plan
      upgradePlan(planId);
      
      toast.success(`Bienvenue dans le plan ${plan.name} !`);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erreur lors du paiement. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const Icon = plan.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/pricing"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux tarifs
          </Link>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">Récapitulatif</h2>
                
                <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-xl mb-6">
                  <div className={`p-3 rounded-xl bg-primary/10`}>
                    <Icon className={`h-6 w-6 ${plan.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Plan {plan.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Facturation {isYearly ? "annuelle" : "mensuelle"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{price}€</p>
                    <p className="text-xs text-muted-foreground">
                      /{isYearly ? "an" : "mois"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{price}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">TVA (20%)</span>
                    <span>{(price * 0.2).toFixed(2)}€</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{(price * 1.2).toFixed(2)}€</span>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-primary/5 rounded-lg flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Paiement 100% sécurisé avec Stripe</span>
                </div>
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">Informations de paiement</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="bg-secondary/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Nom sur la carte</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="card">Numéro de carte</Label>
                    <div className="relative">
                      <Input
                        id="card"
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Date d'expiration</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        maxLength={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <div className="relative">
                        <Input
                          id="cvc"
                          placeholder="123"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                          maxLength={3}
                        />
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="glow"
                    className="w-full"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Payer {(price * 1.2).toFixed(2)}€
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    En procédant au paiement, vous acceptez nos{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      conditions d'utilisation
                    </Link>{" "}
                    et notre{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      politique de confidentialité
                    </Link>
                    .
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
