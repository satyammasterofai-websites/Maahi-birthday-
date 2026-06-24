"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Gift, Play, X, Heart, ChevronDown } from "lucide-react";

import { VideoPlayer } from "./VideoPlayer";

const MEMORY_IMAGES = [
  { id: 1, src: "https://drive.google.com/uc?export=view&id=13xNZpmLXM1A9Ekt0OwVEkiabTESV2DTB", alt: "Beautiful Memory 1" },
  { id: 2, src: "https://drive.google.com/uc?export=view&id=1tWf5AKZ8PO7DzcZ2LpNplDumx1M8spF7", alt: "Beautiful Memory 2" },
  { id: 3, src: "https://drive.google.com/uc?export=view&id=1IGTbpVYHyM9SXfm9R7Zkivny5z9i4k4M", alt: "Beautiful Memory 3" },
  { id: 4, src: "https://drive.google.com/uc?export=view&id=1R_Sk2rGA35SDH_QG-g6IbbJMsJcyXmiU", alt: "Beautiful Memory 4" },
];

export function Celebration() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    // Initial big burst
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const openGift = (url: string) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setActiveVideo(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 pb-20 relative">
      {/* Header Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Floating background decorations */}
        <div className="absolute top-20 left-10 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>🎈</div>
        <div className="absolute top-40 right-20 text-4xl animate-bounce" style={{ animationDuration: '4s' }}>✨</div>
        <div className="absolute bottom-40 left-20 text-4xl animate-bounce" style={{ animationDuration: '2.5s' }}>🎉</div>
        <div className="absolute top-1/2 right-10 text-4xl animate-bounce" style={{ animationDuration: '3.5s' }}>💖</div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
          className="text-center relative z-10"
        >
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-pacifico text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 pb-4"
            animate={{ 
              textShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 20px rgba(236,72,153,0.5)", "0px 0px 0px rgba(0,0,0,0)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Happy Birthday<br/>Mahii!
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-pink-600 mt-6 font-medium max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Wishing the most beautiful girl the most beautiful day. ✨
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 flex flex-col items-center text-pink-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
        >
          <span className="text-sm mb-2 font-bold tracking-widest uppercase">Scroll for surprises</span>
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Gifts Section */}
      <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-pacifico text-pink-600 mb-16 text-center">
          A special surprise for you
        </h2>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.6 }}
          className="relative cursor-pointer group"
          onClick={() => openGift("1204271289")}
        >
          <div className="text-[150px] md:text-[200px] drop-shadow-2xl group-hover:scale-110 transition-transform duration-300 transform-gpu group-hover:rotate-12">
            🎁
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-pink-500 text-white font-bold px-8 py-3 rounded-full whitespace-nowrap shadow-xl group-hover:bg-pink-600 transition-colors animate-bounce text-xl">
            Open Me!
          </div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 min-h-screen">
        <h2 className="text-4xl md:text-5xl font-pacifico text-pink-600 mb-16 text-center">
          Beautiful memories 💖
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {MEMORY_IMAGES.map((img, i) => {
            const rotStart = i % 2 === 0 ? -4 : 4;
            const rotHover = i % 2 === 0 ? 2 : -2;
            return (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.8, rotate: rotStart }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05, rotate: rotHover }}
              className="relative group rounded-2xl overflow-hidden shadow-2xl border-8 border-white bg-white h-[400px] md:h-[500px]"
            >
              <Image 
                src={img.src} 
                alt={img.alt}
                fill
                className="object-contain bg-pink-50/50"
                sizes="(max-width: 768px) 100vw, 50vw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                <Heart className="text-white fill-white animate-bounce drop-shadow-md" size={40} />
              </div>
            </motion.div>
          )})}
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <VideoPlayer 
            videoId={activeVideo} 
            onComplete={() => setActiveVideo(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
