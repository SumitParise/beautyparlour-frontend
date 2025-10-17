import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(true);
  const fullText = "नमस्ते 🌸";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);

        // Delay before fade out
        setTimeout(() => {
          setVisible(false);
          // Trigger onComplete after fade-out finishes
          setTimeout(onComplete, 1000);
        }, 1000);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 bg-gradient-to-br from-pink-50 via-rose-50 to-white flex flex-col items-center justify-center overflow-hidden pt-20 pb-10 md:pt-24 md:pb-16"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Background animated blobs */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <motion.div
              className="absolute w-[250px] h-[250px] bg-rose-300/20 rounded-full blur-3xl top-16 left-10"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[200px] h-[200px] bg-pink-200/30 rounded-full blur-3xl bottom-16 right-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            />
          </div>

          {/* Typing text */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-300 tracking-wide text-center leading-snug"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {text}
            <motion.span
              className="inline-block ml-1 text-rose-300"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.9 }}
            >
              |
            </motion.span>
          </motion.h1>

          {/* Soft loading bar */}
          <div className="relative mt-8 w-[220px] h-[3px] bg-pink-100 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
          </div>

          {/* Tagline */}
          <motion.p
            className="mt-6 text-rose-400 font-light italic text-sm md:text-base text-center px-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            “A touch of grace, a hint of you...”
            {/* Developer credit */}
      <p className="mt-4 text-xs md:text-sm text-rose-300 font-light tracking-wide">
        Developed with 💖 by <span className="font-semibold text-rose-400">Sumit Parise</span>
      </p>

          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
