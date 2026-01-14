import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Receipt, 
  Download, 
  CreditCard, 
  Calendar,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCredits } from "@/hooks/useCredits";
import Navbar from "@/components/layout/Navbar";
import CreditsDisplay from "@/components/credits/CreditsDisplay";
import { Link } from "react-router-dom";

// Mock billing history
const invoices = [
  {
    id: "INV-2024-001",
    date: "2024-01-15",
    amount: 22.80,
    status: "paid",
    plan: "Pro",
  },
  {
    id: "INV-2023-012",
    date: "2023-12-15",
    amount: 22.80,
    status: "paid",
    plan: "Pro",
  },
  {
    id: "INV-2023-011",
    date: "2023-11-15",
    amount: 22.80,
    status: "paid",
    plan: "Pro",
  },
];

const Billing = () => {
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
                <h1 className="text-3xl font-bold text-foreground">Facturation</h1>
                <p className="text-muted-foreground">Gérez votre abonnement et vos factures</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Current Plan */}
              <div className="lg:col-span-2 glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Plan actuel
                </h3>
                
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold capitalize">{credits.plan}</span>
                      <Badge variant="secondary">Actif</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Renouvellement le {credits.resetDate.toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <Link to="/pricing">
                    <Button variant="outline">
                      {credits.plan === "free" ? "Upgrade" : "Changer de plan"}
                    </Button>
                  </Link>
                </div>

                <Separator className="my-6" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">Moyen de paiement</span>
                  </div>
                  {credits.plan !== "free" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">•••• 4242</span>
                      <Button variant="ghost" size="sm">Modifier</Button>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Aucun</span>
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
                Historique des factures
              </h3>

              {invoices.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune facture pour le moment</p>
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
                            {formatDate(invoice.date)} • Plan {invoice.plan}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">{invoice.amount.toFixed(2)}€</p>
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
                  <a 
                    href="#" 
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    Gérer l'abonnement sur Stripe
                    <ExternalLink className="h-3 w-3" />
                  </a>
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
