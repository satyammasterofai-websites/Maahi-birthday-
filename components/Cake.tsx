"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame } from "lucide-react";

export function Cake({ onBlow }: { onBlow: () => void }) {
  const [blown, setBlown] = useState(false);

  const handleBlow = () => {
    setBlown(true);
    setTimeout(() => {
      onBlow();
    }, 1500); // wait a bit before moving to celebration
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-pink-200 via-rose-100 to-purple-200 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 text-4xl opacity-50">🍰</div>
      <div className="absolute top-20 right-20 text-4xl opacity-50">🧁</div>
      <div className="absolute bottom-20 left-20 text-4xl opacity-50">🥂</div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-50">🥳</div>

      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-6xl text-pink-700 font-pacifico mb-4 drop-shadow-md">
          Make a wish! 🎂
        </h2>
        <AnimatePresence>
          {!blown && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl text-pink-400 font-medium animate-pulse"
            >
              (Tap the candle to blow it out)
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="relative mt-20">
        {/* Candle */}
        <div 
          className="absolute -top-24 left-1/2 -translate-x-1/2 cursor-pointer group z-20"
          onClick={handleBlow}
        >
          {/* Flame */}
          <AnimatePresence>
            {!blown && (
              <motion.div
                exit={{ scale: 0, opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative flex justify-center w-full mb-1"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 0.9, 1],
                    rotate: [-2, 2, -1, 1, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                  className="text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]"
                >
                  <Flame size={48} className="fill-orange-400 text-orange-500" />
                </motion.div>
                
                {/* Tooltip */}
                <div className="absolute -right-24 top-0 bg-white/80 px-3 py-1 rounded-full shadow-sm text-sm text-pink-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Blow me! 🌬️
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Candle Body */}
          <div className="w-6 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-t-md mx-auto relative border-2 border-blue-300">
             {/* Stripes */}
             <div className="absolute top-2 w-full h-2 bg-pink-400/50 rotate-12"></div>
             <div className="absolute top-8 w-full h-2 bg-pink-400/50 rotate-12"></div>
             <div className="absolute top-14 w-full h-2 bg-pink-400/50 rotate-12"></div>
          </div>
        </div>

        {/* Cake Layers */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Top Layer */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-48 h-20 bg-pink-300 rounded-t-xl rounded-b-3xl border-4 border-pink-400 relative shadow-inner"
          >
            {/* Frosting drips */}
            <div className="absolute -bottom-3 left-2 w-8 h-8 bg-white rounded-full"></div>
            <div className="absolute -bottom-4 left-10 w-10 h-10 bg-white rounded-full"></div>
            <div className="absolute -bottom-2 left-20 w-8 h-8 bg-white rounded-full"></div>
            <div className="absolute -bottom-5 right-10 w-12 h-12 bg-white rounded-full"></div>
            <div className="absolute -bottom-3 right-2 w-8 h-8 bg-white rounded-full"></div>
          </motion.div>

          {/* Middle Layer */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="w-64 h-24 bg-pink-200 rounded-t-xl rounded-b-3xl border-4 border-pink-300 relative -mt-4 shadow-inner"
          >
            {/* Decorations */}
            <div className="absolute top-1/2 left-4 w-4 h-4 bg-yellow-300 rounded-full"></div>
            <div className="absolute top-1/3 left-12 w-4 h-4 bg-blue-300 rounded-full"></div>
            <div className="absolute top-2/3 right-16 w-4 h-4 bg-green-300 rounded-full"></div>
            <div className="absolute top-1/4 right-6 w-4 h-4 bg-purple-300 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-300 rounded-full"></div>
          </motion.div>

          {/* Bottom Layer */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="w-80 h-28 bg-pink-100 rounded-t-xl rounded-b-xl border-4 border-pink-200 -mt-6 shadow-xl flex justify-center items-center"
          >
            <div className="text-2xl opacity-50 tracking-widest font-pacifico">Mahii</div>
          </motion.div>

          {/* Plate */}
          <div className="w-96 h-8 bg-gray-200 rounded-[100%] border-b-4 border-gray-300 -mt-4 -z-10 shadow-2xl"></div>
        </div>
      </div>
    </motion.div>
  );
}
