import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Waffle3D from "../Waffle3D";
import MagneticButton from "../MagneticButton";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll tracking for Apple-reveal zoom/fade transitions
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Scroll animations
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const textScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  const waffleScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.45]);
  const waffleY = useTransform(scrollYProgress, [0, 0.7], [0, 150]);
  const waffleOpacity = useTransform(scrollYProgress, [0, 0.7, 0.8], [1, 1, 0]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      section.style.setProperty("--mouse-x", `${e.clientX}px`);
      section.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-luxury-black z-10"
    >
      {/* 1. Interactive Spotlight follows the mouse cursor */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 opacity-60"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,122,0,0.06) 0%, rgba(76,199,193,0.03) 50%, transparent 100%)`,
        }}
      />

      {/* 2. Premium background layers */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-orange/10 blur-[130px] rounded-full animate-glow-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-turquoise/10 blur-[130px] rounded-full animate-glow-pulse pointer-events-none" style={{ animationDelay: "-4s" }} />

      {/* 3. Split screen content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[90vh] lg:min-h-screen pt-28 lg:pt-0">
        
        {/* Left Column: Massive Cinematic Brand Info */}
        <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
          <motion.span
            className="inline-block text-brand-turquoise font-mono text-xs md:text-sm uppercase tracking-[0.35em] mb-6 font-semibold"
            style={{ opacity: textOpacity, y: textY }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Bengaluru&apos;s Original Waffle Experience
          </motion.span>

          <motion.h1
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11rem] font-display font-extrabold text-white leading-[0.8] tracking-tighter mb-8 select-none"
            style={{ opacity: textOpacity, y: textY, scale: textScale }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            JUST
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-brand-turquoise text-glow-orange animate-pulse">
              WAFFLES
            </span>
          </motion.h1>

          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-4 max-w-lg mx-auto lg:mx-0"
          >
            <p className="text-xl md:text-2xl text-zinc-100 font-display font-medium tracking-wide">
              Crafted Fresh. Served Warm. Enjoyed More.
            </p>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-sans">
              Experience the pinnacle of waffle mastery. Our strictly eggless, premium recipe forms the ultimate golden crust with deep chocolate pockets.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4 justify-center lg:justify-start items-center mt-10"
            style={{ opacity: textOpacity, y: textY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <MagneticButton
              onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-brand-orange text-white rounded-full font-medium shadow-[0_0_30px_rgba(255,122,0,0.25)] hover:shadow-[0_0_40px_rgba(255,122,0,0.45)] hover:bg-brand-orange/90 transition-all cursor-pointer relative overflow-hidden"
            >
              Explore Menu
            </MagneticButton>

            <MagneticButton
              onClick={() => window.open("https://wa.me/919980773895", "_blank", "noopener,noreferrer")}
              className="px-8 py-4 glass-card-strong text-white rounded-full font-medium hover:bg-white/15 transition-all cursor-pointer"
            >
              Book Now
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Column: Interactive 3D Waffle showcase */}
        <div className="lg:col-span-6 flex items-center justify-center relative w-full h-[50vh] lg:h-[70vh]">
          <motion.div 
            className="w-full h-full flex items-center justify-center"
            style={{ scale: waffleScale, y: waffleY, opacity: waffleOpacity }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Waffle3D />
          </motion.div>
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">Scroll</span>
        <div className="w-5 h-8 border border-zinc-600 rounded-full flex justify-center pt-1">
          <motion.div
            className="w-1 h-2 bg-brand-orange rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
