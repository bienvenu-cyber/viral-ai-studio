import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings as SettingsIcon, 
  Shield, 
  Link2, 
  Bell, 
  Palette,
  Globe,
  Trash2,
  Loader2,
  Eye,
  EyeOff,
  Github,
  Chrome,
  Check,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";

const Settings = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Security
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [language, setLanguage] = useState("fr");
  const [theme, setTheme] = useState("dark");

  // Connections
  const [githubConnected, setGithubConnected] = useState(false);
  const [googleConnected, setGoogleConnected] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setLoading(true);
    try {
      // Mock API call - replace with real implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Mot de passe modifié avec succès");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Erreur lors du changement de mot de passe");
    } finally {
      setLoading(false);
    }
  };

  const handleConnectGitHub = async () => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGithubConnected(true);
      toast.success("GitHub connecté avec succès");
    } catch (error) {
      toast.error("Erreur de connexion GitHub");
    } finally {
      setLoading(false);
    }
  };

  const handleConnectGoogle = async () => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGoogleConnected(true);
      toast.success("Google connecté avec succès");
    } catch (error) {
      toast.error("Erreur de connexion Google");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Compte supprimé");
      logout();
    } catch (error) {
      toast.error("Erreur lors de la suppression du compte");
    } finally {
      setLoading(false);
    }
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
                <SettingsIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Paramètres</h1>
                <p className="text-muted-foreground">Gérez vos préférences et votre compte</p>
              </div>
            </div>

            <Tabs defaultValue="preferences" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
                <TabsTrigger value="preferences" className="gap-2">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Préférences</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Sécurité</span>
                </TabsTrigger>
                <TabsTrigger value="connections" className="gap-2">
                  <Link2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Connexions</span>
                </TabsTrigger>
                <TabsTrigger value="danger" className="gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="hidden sm:inline">Danger</span>
                </TabsTrigger>
              </TabsList>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="space-y-6">
                <div className="glass-card p-6 rounded-2xl space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    Apparence
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="theme">Thème</Label>
                        <p className="text-sm text-muted-foreground">Choisissez l'apparence de l'interface</p>
                      </div>
                      <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dark">Sombre</SelectItem>
                          <SelectItem value="light">Clair</SelectItem>
                          <SelectItem value="system">Système</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="language" className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Langue
                        </Label>
                        <p className="text-sm text-muted-foreground">Langue de l'interface</p>
                      </div>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notifications
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifs">Notifications par email</Label>
                        <p className="text-sm text-muted-foreground">Recevez des mises à jour sur vos projets</p>
                      </div>
                      <Switch 
                        id="email-notifs"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketing">Emails marketing</Label>
                        <p className="text-sm text-muted-foreground">Nouveautés et offres spéciales</p>
                      </div>
                      <Switch 
                        id="marketing"
                        checked={marketingEmails}
                        onCheckedChange={setMarketingEmails}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <div className="glass-card p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Changer le mot de passe
                  </h3>
                  
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mot de passe actuel</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPasswords ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="••••••••"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(!showPasswords)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nouveau mot de passe</Label>
                      <Input
                        id="new-password"
                        type={showPasswords ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                      <Input
                        id="confirm-password"
                        type={showPasswords ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>

                    <Button type="submit" disabled={loading || !currentPassword || !newPassword}>
                      {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                      Modifier le mot de passe
                    </Button>
                  </form>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Authentification à deux facteurs
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ajoutez une couche de sécurité supplémentaire
                      </p>
                    </div>
                    <Switch 
                      checked={twoFactorEnabled}
                      onCheckedChange={setTwoFactorEnabled}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Connections Tab */}
              <TabsContent value="connections" className="space-y-6">
                <div className="glass-card p-6 rounded-2xl space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Link2 className="h-5 w-5 text-primary" />
                    Comptes connectés
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#24292e] rounded-lg">
                          <Github className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">GitHub</p>
                          <p className="text-sm text-muted-foreground">
                            {githubConnected ? "Connecté" : "Non connecté"}
                          </p>
                        </div>
                      </div>
                      {githubConnected ? (
                        <div className="flex items-center gap-2 text-green-500">
                          <Check className="h-4 w-4" />
                          <span className="text-sm">Connecté</span>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          onClick={handleConnectGitHub}
                          disabled={loading}
                        >
                          Connecter
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg">
                          <Chrome className="h-5 w-5 text-[#4285f4]" />
                        </div>
                        <div>
                          <p className="font-medium">Google</p>
                          <p className="text-sm text-muted-foreground">
                            {googleConnected ? "Connecté" : "Non connecté"}
                          </p>
                        </div>
                      </div>
                      {googleConnected ? (
                        <div className="flex items-center gap-2 text-green-500">
                          <Check className="h-4 w-4" />
                          <span className="text-sm">Connecté</span>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          onClick={handleConnectGoogle}
                          disabled={loading}
                        >
                          Connecter
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Danger Zone Tab */}
              <TabsContent value="danger" className="space-y-6">
                <div className="glass-card p-6 rounded-2xl border-destructive/50">
                  <h3 className="text-lg font-semibold text-destructive flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5" />
                    Zone dangereuse
                  </h3>
                  
                  <div className="p-4 bg-destructive/10 rounded-xl border border-destructive/20">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-destructive">Supprimer le compte</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Cette action est irréversible. Tous vos projets et données seront définitivement supprimés.
                        </p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="shrink-0">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action est irréversible. Cela supprimera définitivement votre compte
                              et tous vos projets de nos serveurs.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={handleDeleteAccount}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                              Supprimer mon compte
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
