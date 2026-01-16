import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  CreditCard, 
  Shield, 
  ArrowLeft,
  Loader2,
  Check,
  Lock,
  Sparkles,
  Building2,
  Smartphone,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useCredits } from "@/hooks/useCredits";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import { 
  PLANS_PRICING, 
  formatFCFA, 
  MOBILE_OPERATORS,
  initiateMobilePayment,
  createPaymentGateway,
  type MobileOperator
} from "@/services/lygos";

const plans = {
  pro: {
    name: "Pro",
    icon: Sparkles,
    color: "text-primary",
    features: ["500 générations IA/mois", "10 projets", "Support prioritaire", "Domaine personnalisé"],
  },
  business: {
    name: "Business",
    icon: Building2,
    color: "text-purple-400",
    features: ["Générations illimitées", "Projets illimités", "API access", "White-label"],
  },
};

const Checkout = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { upgradePlan } = useCredits();
  
  const planId = searchParams.get("plan") as "pro" | "business" || "pro";
  const billing = searchParams.get("billing") || "monthly";
  const plan = plans[planId] || plans.pro;
  const isYearly = billing === "yearly";
  const price = isYearly 
    ? PLANS_PRICING[planId].yearly 
    : PLANS_PRICING[planId].monthly;

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"mobile" | "card">("mobile");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [operator, setOperator] = useState<MobileOperator>("MTN_MOMO_CMR");
  
  // Card fields (for future Lygos card support)
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

  const formatPhoneNumber = (value: string) => {
    const v = value.replace(/[^0-9+]/g, "");
    return v.slice(0, 15);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === "mobile" && !phoneNumber) {
      toast.error("Veuillez entrer votre numéro de téléphone");
      return;
    }
    
    if (paymentMethod === "card" && (!cardNumber || !expiry || !cvc || !name)) {
      toast.error("Veuillez remplir tous les champs de la carte");
      return;
    }

    setLoading(true);
    
    try {
      const orderId = `ORD-${Date.now()}`;
      
      if (paymentMethod === "mobile") {
        // Initiate Mobile Money payment via Lygos
        const response = await initiateMobilePayment({
          amount: price,
          currency: 'XAF',
          phoneNumber: phoneNumber,
          operator: operator,
          orderId: orderId,
          description: `Abonnement ${plan.name} - ${isYearly ? 'Annuel' : 'Mensuel'}`,
          successUrl: `${window.location.origin}/dashboard?payment=success`,
          failureUrl: `${window.location.origin}/checkout?plan=${planId}&billing=${billing}&payment=failed`,
        });
        
        if (response.status === 'pending') {
          toast.success("Un SMS vous sera envoyé pour confirmer le paiement");
          // In production, poll for payment status or use webhook
          await new Promise(resolve => setTimeout(resolve, 3000));
          upgradePlan(planId);
          toast.success(`Bienvenue dans le plan ${plan.name} !`);
          navigate("/dashboard");
        }
      } else {
        // Create payment gateway for card
        const response = await createPaymentGateway({
          title: `Abonnement ${plan.name}`,
          amount: price,
          description: `Plan ${plan.name} - ${isYearly ? 'Annuel' : 'Mensuel'}`,
          successUrl: `${window.location.origin}/dashboard?payment=success`,
          failureUrl: `${window.location.origin}/checkout?plan=${planId}&billing=${billing}&payment=failed`,
        });
        
        if (response.link) {
          // Redirect to Lygos payment gateway
          window.location.href = response.link;
        } else {
          // Mock for demo
          await new Promise(resolve => setTimeout(resolve, 2000));
          upgradePlan(planId);
          toast.success(`Bienvenue dans le plan ${plan.name} !`);
          navigate("/dashboard");
        }
      }
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
            {t('common.back')}
          </Link>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">{t('checkout.order_summary')}</h2>
                
                <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-xl mb-6">
                  <div className={`p-3 rounded-xl bg-primary/10`}>
                    <Icon className={`h-6 w-6 ${plan.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{t('checkout.plan')} {plan.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('checkout.billing_cycle')}: {isYearly ? t('checkout.yearly') : t('checkout.monthly')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatFCFA(price)}</p>
                    <p className="text-xs text-muted-foreground">
                      /{isYearly ? t('pricing.per_year').replace('/', '') : t('pricing.per_month').replace('/', '')}
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
                    <span>{formatFCFA(price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">TVA (0%)</span>
                    <span>{formatFCFA(0)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>{t('checkout.total')}</span>
                    <span className="text-primary">{formatFCFA(price)}</span>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-primary/5 rounded-lg flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>{t('checkout.secure_payment')}</span>
                </div>
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">{t('checkout.payment_method')}</h2>

                {/* Payment Method Selection */}
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(v) => setPaymentMethod(v as "mobile" | "card")}
                  className="grid grid-cols-2 gap-4 mb-6"
                >
                  <div>
                    <RadioGroupItem
                      value="mobile"
                      id="mobile"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="mobile"
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <Smartphone className="mb-2 h-6 w-6" />
                      <span className="text-sm font-medium">{t('checkout.mobile_money')}</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="card"
                      id="card"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="card"
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <CreditCard className="mb-2 h-6 w-6" />
                      <span className="text-sm font-medium">{t('checkout.card')}</span>
                    </Label>
                  </div>
                </RadioGroup>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {paymentMethod === "mobile" ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="operator">{t('checkout.operator')}</Label>
                        <Select value={operator} onValueChange={(v) => setOperator(v as MobileOperator)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un opérateur" />
                          </SelectTrigger>
                          <SelectContent>
                            {MOBILE_OPERATORS.map((op) => (
                              <SelectItem key={op.id} value={op.id}>
                                <span className="flex items-center gap-2">
                                  <span>{op.flag}</span>
                                  <span>{op.name}</span>
                                  <span className="text-muted-foreground text-xs">({op.country})</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('checkout.phone_number')}</Label>
                        <div className="relative">
                          <Input
                            id="phone"
                            placeholder="+237 6XX XXX XXX"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                          />
                          <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Vous recevrez une demande de paiement sur ce numéro
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}

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
                        {t('checkout.processing')}
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        {t('checkout.pay_now')} - {formatFCFA(price)}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    {t('auth.terms_agree')}{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      {t('auth.terms')}
                    </Link>{" "}
                    {t('auth.and')}{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      {t('auth.privacy')}
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
