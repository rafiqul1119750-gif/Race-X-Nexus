import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"draw" | "pulse" | "blast">("draw");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("pulse"), 1200);
    const t2 = setTimeout(() => setPhase("blast"), 2800);
    const t3 = setTimeout(() => onComplete(), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {phase !== "blast" ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {/* RX SVG Logo */}
          <motion.div
            animate={
              phase === "pulse"
                ? {
                    filter: [
                      "drop-shadow(0 0 4px #00f7ff40) drop-shadow(0 0 8px #00f7ff20)",
                      "drop-shadow(0 0 20px #00f7ffcc) drop-shadow(0 0 40px #00f7ff80) drop-shadow(0 0 80px #00f7ff40)",
                      "drop-shadow(0 0 10px #00f7ff80) drop-shadow(0 0 20px #00f7ff50)",
                      "drop-shadow(0 0 30px #00f7ffdd) drop-shadow(0 0 60px #00f7ffaa) drop-shadow(0 0 100px #00f7ff60)",
                    ],
                  }
                : {
                    filter: "drop-shadow(0 0 2px #00f7ff30)",
                  }
            }
            transition={
              phase === "pulse"
                ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.3 }
            }
          >
            <svg
              width="160"
              height="120"
              viewBox="0 0 160 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* R glyph */}
              <motion.path
                d="M12 16 L12 104"
                stroke="#00f7ff"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              />
              <motion.path
                d="M12 16 L48 16 Q68 16 68 38 Q68 60 48 60 L12 60"
                stroke="#00f7ff"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
              />
              <motion.path
                d="M36 60 L72 104"
                stroke="#00f7ff"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.75, ease: "easeOut" }}
              />

              {/* Separator dash */}
              <motion.line
                x1="84"
                y1="60"
                x2="92"
                y2="60"
                stroke="#00f7ff"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 0.5, scaleX: 1 }}
                transition={{ duration: 0.2, delay: 1.0 }}
              />

              {/* X glyph */}
              <motion.path
                d="M100 16 L148 104"
                stroke="#00f7ff"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.6, ease: "easeOut" }}
              />
              <motion.path
                d="M148 16 L100 104"
                stroke="#00f7ff"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.85, ease: "easeOut" }}
              />

              {/* Accent corner marks */}
              <motion.path
                d="M0 0 L16 0 L16 6"
                stroke="#00f7ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.1, duration: 0.3 }}
              />
              <motion.path
                d="M160 0 L144 0 L144 6"
                stroke="#00f7ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.1, duration: 0.3 }}
              />
              <motion.path
                d="M0 120 L16 120 L16 114"
                stroke="#00f7ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.1, duration: 0.3 }}
              />
              <motion.path
                d="M160 120 L144 120 L144 114"
                stroke="#00f7ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.1, duration: 0.3 }}
              />
            </svg>
          </motion.div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.4 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              fontFamily: "'Rajdhani', 'Courier New', monospace",
              fontSize: "11px",
              letterSpacing: "0.22em",
              color: "#5a6a7a",
              textTransform: "uppercase",
            }}
          >
            THE NEXUS IS LOADING...
            <span
              style={{
                display: "inline-block",
                width: "8px",
                color: "#00f7ff",
                opacity: cursorVisible ? 1 : 0,
                transition: "opacity 0.1s",
                fontWeight: "bold",
              }}
            >
              |
            </span>
          </motion.div>

          {/* Horizontal scan line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 0.6, 0] }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: "280px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, #00f7ff, transparent)",
              transformOrigin: "center",
            }}
          />
        </motion.div>
      ) : (
        /* Blast / scale-up exit frame */
        <motion.div
          key="blast"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 1.6 }}
          transition={{ duration: 0.55, ease: "easeIn" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
            <path d="M12 16 L12 104" stroke="#00f7ff" strokeWidth="8" strokeLinecap="round" />
            <path d="M12 16 L48 16 Q68 16 68 38 Q68 60 48 60 L12 60" stroke="#00f7ff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M36 60 L72 104" stroke="#00f7ff" strokeWidth="8" strokeLinecap="round" />
            <path d="M100 16 L148 104" stroke="#00f7ff" strokeWidth="8" strokeLinecap="round" />
            <path d="M148 16 L100 104" stroke="#00f7ff" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
