import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface AIGeneratingOverlayProps {
  isVisible: boolean;
}

const AIGeneratingOverlay = ({ isVisible }: AIGeneratingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo/Icon */}
        <div className="relative">
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            style={{ width: 120, height: 120 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Middle pulsing ring */}
          <motion.div
            className="absolute rounded-full bg-primary/10"
            style={{ width: 100, height: 100, top: 10, left: 10 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.2, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Inner circle with icon */}
          <motion.div
            className="relative w-[120px] h-[120px] flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-lg shadow-primary/30">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary"
              style={{
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: [0, Math.cos((i * 60 * Math.PI) / 180) * 60],
                y: [0, Math.sin((i * 60 * Math.PI) / 180) * 60],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Text */}
        <div className="text-center">
          <motion.h3
            className="text-xl font-semibold mb-2"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Generating with AI
          </motion.h3>
          
          {/* Animated dots */}
          <div className="flex items-center justify-center gap-1">
            <span className="text-muted-foreground">Creating your design</span>
            <div className="flex gap-0.5 ml-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{ 
                    y: [0, -5, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Code-like animation */}
        <motion.div
          className="w-80 h-24 bg-card/80 rounded-xl border border-border/50 overflow-hidden p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="font-mono text-xs space-y-1.5">
            {[
              { text: "Analyzing prompt...", color: "text-primary" },
              { text: "Generating structure...", color: "text-green-400" },
              { text: "Applying styles...", color: "text-blue-400" },
              { text: "Optimizing output...", color: "text-yellow-400" },
            ].map((line, i) => (
              <motion.div
                key={i}
                className={`flex items-center gap-2 ${line.color}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: [0, 1, 1, 0.5], x: 0 }}
                transition={{
                  duration: 2,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  ▸
                </motion.span>
                {line.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AIGeneratingOverlay;
