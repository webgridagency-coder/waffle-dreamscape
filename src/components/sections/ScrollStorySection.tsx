import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const stages = [
  { title: "Flour", subtitle: "Premium quality flour, sifted to perfection", color: "#e8d5b7" },
  { title: "Batter", subtitle: "Freshly mixed, smooth as silk", color: "#f5e6d3" },
  { title: "Press", subtitle: "Golden grids form in the hot iron", color: "#d4a574" },
  { title: "Drizzle", subtitle: "Rich chocolate cascades over the warm surface", color: "#8B4513" },
  { title: "Serve", subtitle: "Crafted fresh. Served warm. Enjoyed more.", color: "#FF7A00" },
];

export default function ScrollStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative" style={{ height: `${stages.length * 100}vh` }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient that shifts */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: useTransform(
              scrollYProgress,
              [0, 0.2, 0.4, 0.6, 0.8, 1],
              [
                "radial-gradient(circle at center, rgba(232,213,183,0.05) 0%, transparent 70%)",
                "radial-gradient(circle at center, rgba(245,230,211,0.05) 0%, transparent 70%)",
                "radial-gradient(circle at center, rgba(212,165,116,0.08) 0%, transparent 70%)",
                "radial-gradient(circle at center, rgba(139,69,19,0.08) 0%, transparent 70%)",
                "radial-gradient(circle at center, rgba(255,122,0,0.1) 0%, transparent 70%)",
                "radial-gradient(circle at center, rgba(255,122,0,0.1) 0%, transparent 70%)",
              ]
            ),
          }}
        />

        {/* Progress bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
          <motion.div className="h-full bg-brand-orange" style={{ width: progressWidth }} />
        </div>

        {/* Stage content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {stages.map((stage, i) => {
            const stageStart = i / stages.length;
            const stageEnd = (i + 1) / stages.length;
            const stageMid = (stageStart + stageEnd) / 2;

            return (
              <StageContent
                key={stage.title}
                stage={stage}
                index={i}
                scrollYProgress={scrollYProgress}
                stageStart={stageStart}
                stageEnd={stageEnd}
                stageMid={stageMid}
              />
            );
          })}
        </div>

        {/* Stage counter */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {stages.map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/20"
              style={{
                backgroundColor: useTransform(
                  scrollYProgress,
                  [i / stages.length, (i + 0.5) / stages.length],
                  ["rgba(255,255,255,0.2)", "#FF7A00"]
                ),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StageContent({
  stage,
  index,
  scrollYProgress,
  stageStart,
  stageEnd,
  stageMid,
}: {
  stage: typeof stages[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  stageStart: number;
  stageEnd: number;
  stageMid: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [stageStart, stageStart + 0.05, stageMid, stageEnd - 0.05, stageEnd],
    [0, 1, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [stageStart, stageStart + 0.1, stageEnd - 0.1, stageEnd],
    [60, 0, 0, -60]
  );

  const scale = useTransform(
    scrollYProgress,
    [stageStart, stageStart + 0.1, stageEnd - 0.1, stageEnd],
    [0.9, 1, 1, 0.9]
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ opacity, y, scale }}
    >
      <motion.span
        className="text-brand-orange font-mono text-xs uppercase tracking-[0.3em] mb-6 block"
      >
        Stage {String(index + 1).padStart(2, "0")}
      </motion.span>
      <h3
        className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-6"
        style={{ color: stage.color }}
      >
        {stage.title}
      </h3>
      <p className="text-zinc-400 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
        {stage.subtitle}
      </p>

      {/* Animated icon for each stage */}
      <motion.div
        className="mt-10 w-24 h-24 rounded-full border border-white/10 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
          <span className="text-2xl font-display font-bold" style={{ color: stage.color }}>
            {index + 1}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
