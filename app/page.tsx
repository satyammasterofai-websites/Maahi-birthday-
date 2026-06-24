"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Countdown } from "@/components/Countdown";
import { Cake } from "@/components/Cake";
import { Celebration } from "@/components/Celebration";
import { VideoPlayer } from "@/components/VideoPlayer";

export default function Home() {
  const [stage, setStage] = useState<"countdown" | "cake" | "video1" | "celebration">("countdown");

  return (
    <main className="min-h-screen bg-pink-50 overflow-hidden font-sans relative text-slate-800">
      <AnimatePresence mode="wait">
        {stage === "countdown" && (
          <Countdown key="countdown" onComplete={() => setStage("cake")} />
        )}
        {stage === "cake" && (
          <Cake key="cake" onBlow={() => setStage("video1")} />
        )}
        {stage === "video1" && (
          <VideoPlayer 
            key="video1" 
            videoId="1204270043"
            onComplete={() => setStage("celebration")} 
          />
        )}
        {stage === "celebration" && <Celebration key="celebration" />}
      </AnimatePresence>
    </main>
  );
}
