import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, Github } from "lucide-react";
import { handleOAuthCallback } from "@/services/github";
import { Button } from "@/components/ui/button";

type CallbackStatus = "loading" | "success" | "error";

const GitHubCallback = () => {
  const [status, setStatus] = useState<CallbackStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const processCallback = async () => {
      const code = searchParams.get("code");
      const error = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");

      if (error) {
        setStatus("error");
        setErrorMessage(errorDescription || error);
        return;
      }

      if (!code) {
        setStatus("error");
        setErrorMessage("No authorization code received");
        return;
      }

      try {
        const state = searchParams.get("state");
        const token = await handleOAuthCallback(code, state || "");
        
        if (token) {
          setStatus("success");
          // Redirect to dashboard after short delay
          setTimeout(() => {
            navigate("/dashboard", { replace: true });
          }, 1500);
        } else {
          throw new Error("Failed to obtain access token");
        }
      } catch (err) {
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Authentication failed");
      }
    };

    processCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 rounded-2xl text-center max-w-sm w-full relative z-10"
      >
        {status === "loading" && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4"
            >
              <Github className="h-8 w-8 text-foreground" />
            </motion.div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Connecting to GitHub
            </h2>
            <p className="text-muted-foreground text-sm">
              Please wait while we complete the authentication...
            </p>
            <Loader2 className="h-6 w-6 animate-spin mx-auto mt-4 text-primary" />
          </>
        )}

        {status === "success" && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4"
            >
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </motion.div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Successfully Connected!
            </h2>
            <p className="text-muted-foreground text-sm">
              Redirecting to your dashboard...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/20 mb-4"
            >
              <XCircle className="h-8 w-8 text-destructive" />
            </motion.div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Authentication Failed
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              {errorMessage || "An error occurred during authentication"}
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate("/auth")}>
                Back to Login
              </Button>
              <Button variant="glow" onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default GitHubCallback;
