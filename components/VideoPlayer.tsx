"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import Player from "@vimeo/player";

export function VideoPlayer({ videoId, onComplete }: { videoId: string, onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    playerRef.current = new Player(containerRef.current, {
      id: parseInt(videoId, 10),
      autoplay: true,
      controls: true,
      dnt: true,
      title: false,
      byline: false,
      portrait: false,
    });

    playerRef.current.on('ended', () => {
      onComplete();
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 p-4 md:p-8"
    >
      <div className="w-full h-full max-w-6xl mx-auto relative flex items-center justify-center">
        <div ref={containerRef} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:rounded-2xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10" />
      </div>
      
      <button 
        onClick={onComplete}
        className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full backdrop-blur-md z-10 font-medium transition-colors"
      >
        Skip Video
      </button>
    </motion.div>
  );
}
