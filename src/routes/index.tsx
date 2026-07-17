import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";

import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SignatureSection from "@/components/sections/SignatureSection";
import JourneySection from "@/components/sections/JourneySection";
import TeamSection from "@/components/sections/TeamSection";
import LocationsSection from "@/components/sections/LocationsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GallerySection from "@/components/sections/GallerySection";
import FooterSection from "@/components/sections/FooterSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Just Waffles | Enjoy More — Bengaluru's Premium Waffle Experience" },
      {
        name: "description",
        content:
          "Bengaluru's most loved premium eggless waffle destination. Belgian Waffles, Bubble Waffles, Waffy Wich & more. Crafted fresh, served warm, enjoyed more.",
      },
      { property: "og:title", content: "Just Waffles | Enjoy More" },
      {
        property: "og:description",
        content: "Bengaluru's most loved premium eggless waffle destination.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <div className="relative min-h-screen bg-[#FCFBF8] noise-overlay text-[#241914]">
        <Navigation />

        <main>
          <HeroSection />
          <StatsSection />
          <ExperienceSection />
          <SignatureSection />
          <JourneySection />
          <TeamSection />
          <LocationsSection />
          <TestimonialsSection />
          <GallerySection />
          <FooterSection />
        </main>
      </div>
    </>
  );
}
