import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya S.",
    rating: 5,
    text: "The best waffles I've ever had in Bengaluru! The Brownielicious Waffy Tree is absolutely divine. Can't believe it's eggless!",
    tag: "Student Favourite",
    color: "orange" as const,
  },
  {
    name: "Rahul M.",
    rating: 5,
    text: "Premium quality at student-friendly prices. The bubble waffle sundae is a game-changer. My go-to spot after college.",
    tag: "Regular Customer",
    color: "turquoise" as const,
  },
  {
    name: "Ananya K.",
    rating: 5,
    text: "Finally, a waffle place that understands what 'premium' means without breaking the bank. The KitKat Waffy Wich is my weakness!",
    tag: "Food Blogger",
    color: "orange" as const,
  },
  {
    name: "Vikram R.",
    rating: 5,
    text: "Took my family here and everyone loved it. From kids to grandparents, there's something for everyone. 10/10 would recommend.",
    tag: "Family Visit",
    color: "turquoise" as const,
  },
  {
    name: "Sneha P.",
    rating: 5,
    text: "Absolutely mouth-watering! The waffles are crispy on the outside, soft inside, and loaded with drizzle. A must-try in Kammanahalli.",
    tag: "Local Resident",
    color: "orange" as const,
  },
  {
    name: "Karan D.",
    rating: 5,
    text: "The waffle sandwich (Waffy Wich) is so unique. Very different from standard waffles, and the chocolate coating is rich and premium.",
    tag: "Waffle Fanatic",
    color: "turquoise" as const,
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [index, setIndex] = useState(0);

  // Auto-running carousel index increment
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % (testimonials.length - 2));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 3 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === testimonials.length - 3 ? 0 : prev + 1));
  };

  // Get active 3 testimonials to show on desktop
  const activeTestimonials = [
    testimonials[index],
    testimonials[(index + 1) % testimonials.length],
    testimonials[(index + 2) % testimonials.length],
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-luxury-black/95 border-b border-white/5" ref={ref}>
      {/* Background orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand-turquoise/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-turquoise font-mono text-xs uppercase tracking-[0.3em] mb-4 block font-semibold">
            Customer Love
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-4">
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-turquoise">Thousands</span>
          </h2>
          <div className="flex items-center justify-center gap-1.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-brand-orange text-brand-orange" />
            ))}
          </div>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-2">
            4.8+ Average Rating across all platforms
          </p>
        </motion.div>

        {/* Carousel Area */}
        <div className="relative px-0 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch min-h-[360px]">
            <AnimatePresence mode="popLayout">
              {activeTestimonials.map((item, i) => (
                <motion.div
                  key={item.name}
                  className={`glass-card rounded-[2rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] ${
                    item.color === "orange" ? "hover:glow-border-orange" : "hover:glow-border-turquoise"
                  } ${
                    i === 0 ? "animate-float" : i === 1 ? "animate-float-slow" : ""
                  }`}
                  style={{ animationDelay: i === 0 ? "0s" : i === 1 ? "-2s" : "-4s" }}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {/* Quotes Icon */}
                  <div className="absolute top-6 right-6 opacity-5 pointer-events-none">
                    <Quote className="w-16 h-16 text-white" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(item.rating)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-3.5 h-3.5 fill-brand-orange text-brand-orange" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-8 font-sans italic">
                    &ldquo;{item.text}&rdquo;
                  </p>

                  {/* Author detail */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-auto">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white ${
                      item.color === "orange" ? "bg-brand-orange/20 border border-brand-orange/40 text-brand-orange" : "bg-brand-turquoise/20 border border-brand-turquoise/40 text-brand-turquoise"
                    }`}>
                      {item.name[0]}
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium text-sm">{item.name}</p>
                      <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest font-semibold block mt-0.5">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={handlePrev}
              className="w-11 h-11 glass-card rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2.5">
              {[...Array(testimonials.length - 2)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === index 
                      ? "bg-gradient-to-r from-brand-orange to-brand-turquoise w-8" 
                      : "bg-white/15 w-2 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-11 h-11 glass-card rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
