import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Mail, Lock, User, Github, Sparkles, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type AuthMode = "login" | "register" | "forgot" | "reset";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("token");
  
  const [mode, setMode] = useState<AuthMode>(resetToken ? "reset" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, register, loginWithGitHub, requestPasswordReset, confirmPasswordReset } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      switch (mode) {
        case "login":
          await login(email, password);
          toast.success("Welcome back!");
          navigate("/dashboard");
          break;
        case "register":
          await register(email, password, name);
          toast.success("Account created successfully!");
          navigate("/dashboard");
          break;
        case "forgot":
          await requestPasswordReset(email);
          toast.success("Password reset email sent! Check your inbox.");
          setMode("login");
          break;
        case "reset":
          if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
          }
          if (resetToken) {
            await confirmPasswordReset(resetToken, password);
            toast.success("Password reset successfully! Please log in.");
            setMode("login");
          }
          break;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGitHubLogin = async () => {
    setIsSubmitting(true);
    try {
      await loginWithGitHub();
      toast.success("Connected with GitHub!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "GitHub login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "login": return "Welcome back";
      case "register": return "Create an account";
      case "forgot": return "Reset your password";
      case "reset": return "Set new password";
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case "login": return "Sign in to access your projects";
      case "register": return "Start building amazing websites";
      case "forgot": return "Enter your email to receive a reset link";
      case "reset": return "Choose a new password for your account";
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-500 mb-4"
          >
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground">{getTitle()}</h1>
          <p className="text-muted-foreground mt-1">{getSubtitle()}</p>
        </div>

        {/* Auth Card */}
        <div className="glass-card p-6 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === "register" && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 bg-secondary/50"
                      required={mode === "register"}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {(mode === "login" || mode === "register" || mode === "forgot") && (
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-secondary/50"
                  required
                />
              </div>
            )}

            {(mode === "login" || mode === "register" || mode === "reset") && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder={mode === "reset" ? "New password" : "Password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-secondary/50"
                  required
                  minLength={8}
                />
              </div>
            )}

            {mode === "reset" && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-secondary/50"
                  required
                  minLength={8}
                />
              </div>
            )}

            {mode === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              variant="glow"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {mode === "login" && "Sign In"}
                  {mode === "register" && "Create Account"}
                  {mode === "forgot" && "Send Reset Link"}
                  {mode === "reset" && "Reset Password"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {(mode === "login" || mode === "register") && (
            <>
              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* OAuth Buttons */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGitHubLogin}
                disabled={isSubmitting}
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </>
          )}

          {/* Navigation Links */}
          <div className="text-center text-sm text-muted-foreground mt-6 space-y-2">
            {mode === "login" && (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            )}
            {mode === "register" && (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
            {(mode === "forgot" || mode === "reset") && (
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-primary hover:underline font-medium flex items-center gap-1 mx-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;