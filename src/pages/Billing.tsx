import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  Receipt, 
  Download, 
  CreditCard, 
  Calendar,
  ExternalLink,
  Sparkles,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCredits } from "@/hooks/useCredits";
import Navbar from "@/components/layout/Navbar";
import CreditsDisplay from "@/components/credits/CreditsDisplay";
import { Link } from "react-router-dom";
import { formatFCFA, PLANS_PRICING } from "@/services/lygos";

// Mock billing history in FCFA
const invoices = [
  {
    id: "INV-2024-001",
    date: "2024-01-15",
    amount: 9900,
    status: "paid",
    plan: "Pro",
    method: "MTN Mobile Money"
  },
  {
    id: "INV-2023-012",
    date: "2023-12-15",
    amount: 9900,
    status: "paid",
    plan: "Pro",
    method: "Orange Money"
  },
  {
    id: "INV-2023-011",
    date: "2023-11-15",
    amount: 9900,
    status: "paid",
    plan: "Pro",
    method: "MTN Mobile Money"
  },
];

const Billing = () => {
  const { t } = useTranslation();
  const { credits } = useCredits();
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownloadInvoice = async (invoiceId: string) => {
    setDownloading(invoiceId);
    // Mock download - replace with real implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDownloading(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const currentPlanPrice = credits.plan === 'free' 
    ? 0 
    : credits.plan === 'pro' 
      ? PLANS_PRICING.pro.monthly 
      : PLANS_PRICING.business.monthly;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-primary/10">
                <Receipt className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{t('billing.title')}</h1>
                <p className="text-muted-foreground">{t('billing.subtitle')}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Current Plan */}
              <div className="lg:col-span-2 glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  {t('billing.current_plan')}
                </h3>
                
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold capitalize">{credits.plan}</span>
                      <Badge variant="secondary">Actif</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {credits.plan !== 'free' && (
                        <span className="font-medium">{formatFCFA(currentPlanPrice)}/mois • </span>
                      )}
                      {t('billing.next_billing')}: {credits.resetDate.toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <Link to="/pricing">
                    <Button variant="outline">
                      {credits.plan === "free" ? t('billing.upgrade') : "Changer de plan"}
                    </Button>
                  </Link>
                </div>

                <Separator className="my-6" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{t('billing.payment_method')}</span>
                  </div>
                  {credits.plan !== "free" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">MTN Mobile Money •••• 3901</span>
                      <Button variant="ghost" size="sm">{t('billing.change_payment')}</Button>
                    </div>
                  ) : (
                    <Link to="/pricing">
                      <Button variant="ghost" size="sm">{t('billing.add_payment')}</Button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Credits */}
              <div className="lg:col-span-1">
                <CreditsDisplay variant="full" />
              </div>
            </div>

            {/* Invoice History */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {t('billing.history')}
              </h3>

              {credits.plan === 'free' ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune facture pour le moment</p>
                  <p className="text-sm mt-2">Passez à un plan payant pour voir votre historique</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-secondary rounded-lg">
                          <Receipt className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{invoice.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(invoice.date)} • Plan {invoice.plan} • {invoice.method}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">{formatFCFA(invoice.amount)}</p>
                          <Badge 
                            variant="outline" 
                            className="text-green-500 border-green-500/30"
                          >
                            Payé
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                          disabled={downloading === invoice.id}
                        >
                          {downloading === invoice.id ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          ) : (
                            <Download className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {credits.plan !== "free" && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Paiements sécurisés par Lygos Pay
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Billing;
