"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const CATS = [
  { emoji: "🐱", x1: -50, y1: -50, x2: 100, y2: 100, r: 45 },
  { emoji: "😸", x1: 50, y1: -80, x2: -100, y2: 50, r: -45 },
  { emoji: "😻", x1: 80, y1: 80, x2: -50, y2: -100, r: 120 },
  { emoji: "😽", x1: -80, y1: 50, x2: 80, y2: -50, r: -120 },
  { emoji: "😺", x1: 0, y1: 100, x2: 0, y2: -100, r: 180 },
];

export function Countdown({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => onComplete(), 500); // short pause at 0
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-200 via-purple-200 to-pink-200 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
    >
      {/* Sparkles background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
        {[...Array(20)].map((_, i) => {
          const startX = (i * 137.5) % 1000;
          const startY = (i * 93.1) % 1000;
          const duration = 1 + (i % 3);
          const delay = (i % 5) * 0.5;
          const endY = -50 - (i % 50);

          return (
            <motion.div
              key={i}
              className="absolute text-yellow-400 text-2xl"
              initial={{
                x: startX,
                y: startY,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                y: [null, endY],
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
              }}
            >
              ✨
            </motion.div>
          );
        })}
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-purple-700 mb-8 font-pacifico text-center drop-shadow-md z-10">
        Get ready for a surprise...
      </h1>

      <div className="relative z-10">
        <motion.div
          key={count}
          initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-purple-600 drop-shadow-2xl filter"
          style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}
        >
          {count > 0 ? count : "🎉"}
        </motion.div>

        {/* Floating cats around the numbers */}
        {CATS.map((cat, i) => (
          <motion.div
            key={i}
            className="absolute text-5xl"
            initial={{
              x: cat.x1,
              y: cat.y1,
              opacity: 0,
            }}
            animate={{
              x: cat.x2,
              y: cat.y2,
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.2, 1, 0.5],
              rotate: cat.r,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2,
            }}
            style={{
              top: "50%",
              left: "50%",
              marginLeft: "-24px",
              marginTop: "-24px",
            }}
          >
            {cat.emoji}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
