import React from "react";
import { HeroSection } from "../components/HeroSection";
import { NowPlayingSection } from "../components/NowPlayingSection";
import { ComingSoonSection } from "../components/ComingSoonSection";

export const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#070C1C]">
      <HeroSection />
      <NowPlayingSection />
      <ComingSoonSection />
    </div>
  );
};
