import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const stats = [
  {
    value: 4.8,
    suffix: "★",
    label: "Customer Rating",
    desc: "Across Google & food platforms",
    color: "orange" as const,
  },
  {
    value: 100,
    suffix: "%",
    label: "Eggless",
    desc: "Strictly vegetarian & pure ingredients",
    color: "turquoise" as const,
  },
  {
    value: 2024,
    suffix: "",
    label: "Founded",
    desc: "Spreading waffle dreams in Blr",
    color: "orange" as const,
  },
  {
    value: 4,
    suffix: "+",
    label: "Locations",
    desc: "Growing neighborhood stores",
    color: "turquoise" as const,
  },
];

function Counter({ value, suffix, color }: { value: number; suffix: string; color: "orange" | "turquoise" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 80,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // Handle decimals for rating (e.g. 4.8)
        if (value % 1 !== 0) {
          ref.current.textContent = latest.toFixed(1) + suffix;
        } else {
          ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
        }
      }
    });
  }, [springValue, value, suffix]);

  return (
    <span
      ref={ref}
      className={`text-4xl md:text-5xl lg:text-6xl font-display font-bold text-glow-${
        color === "orange" ? "orange" : "turquoise"
      } ${color === "orange" ? "text-brand-orange" : "text-brand-turquoise"}`}
    >
      0{suffix}
    </span>
  );
}

export default function StatsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={containerRef}
      className="relative py-20 px-6 overflow-hidden bg-luxury-black/95 z-20 border-y border-white/5"
    >
      {/* Background soft glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[150px] bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 ${
                stat.color === "orange"
                  ? "hover:glow-border-orange hover:bg-white/[0.04]"
                  : "hover:glow-border-turquoise hover:bg-white/[0.04]"
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="mb-4">
                <Counter value={stat.value} suffix={stat.suffix} color={stat.color} />
              </div>
              <div>
                <h4 className="text-white font-medium text-lg tracking-wide mb-1">
                  {stat.label}
                </h4>
                <p className="text-zinc-500 text-sm">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
