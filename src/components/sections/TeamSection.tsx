import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import divyaImg from "@/assets/divya.png";
import venkatImg from "@/assets/venkat.png";
import vinodImg from "@/assets/vinod.png";

const teamMembers = [
  {
    name: "Divyateja Baireddy",
    role: "Co-Founder",
    desc: "Divya is a banker by profession possessing good financial & marketing skills. A baker by passion holding experience in waffle making. She heads finance, brand's strategy, and R&D.",
    image: divyaImg,
    color: "orange" as const,
  },
  {
    name: "Venkatesh Kovuru",
    role: "Co-Founder",
    desc: "Venkat is a tax consultant by profession having worked in Big 4 firms like Deloitte & PwC. He heads business, franchise operations, and supply chain excellence.",
    image: venkatImg,
    color: "turquoise" as const,
  },
  {
    name: "Vinod Achuthan",
    role: "Co-Promoter & Advisor",
    desc: "Vinod Achuthan is an engineer by profession having worked with some of the largest MNCs in the world across geographies. He is also an entrepreneur and serial investor with primary interests in engineering design and consulting. He has investments in the F&B sector where he operates stores of franchised brands, is the master franchisor for the fast-growing QSR chain Bigguys, and is an investor in multiple brands. With Just Waffles, apart from being an investor, he is also an advisor to the board.",
    image: vinodImg,
    color: "orange" as const,
  },
];

function TeamMemberCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className="group relative h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`glass-card rounded-3xl overflow-hidden transition-all duration-500 flex flex-col md:flex-row items-center p-6 md:p-8 gap-6 md:gap-8 min-h-[280px] h-full ${
          isHovered
            ? member.color === "orange"
              ? "glow-border-orange bg-white/[0.04]"
              : "glow-border-turquoise bg-white/[0.04]"
            : "bg-white/[0.02]"
        }`}
      >
        {/* Glow behind image */}
        <div
          className={`absolute w-32 h-32 blur-[40px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 ${
            member.color === "orange" ? "bg-brand-orange" : "bg-brand-turquoise"
          }`}
          style={{ transform: "translate3d(0,0, -20px)" }}
        />

        {/* Image Container */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
          <span
            className={`font-mono text-xs uppercase tracking-widest mb-1 font-semibold ${
              member.color === "orange" ? "text-brand-orange" : "text-brand-turquoise"
            }`}
          >
            {member.role}
          </span>
          <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-wide">
            {member.name}
          </h3>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-sans">
            {member.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="team" className="relative py-32 px-6 overflow-hidden" ref={containerRef}>
      {/* Background radial glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand-turquoise/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-turquoise font-mono text-xs uppercase tracking-[0.3em] mb-4 block font-semibold">
            Behind the Dreams
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
            The Brand <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-turquoise">Team</span>
          </h2>
          <div className="mt-4 w-24 h-0.5 bg-gradient-to-r from-brand-orange to-brand-turquoise mx-auto rounded-full" />
        </motion.div>

        {/* Member Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              className={
                i === 2
                  ? "lg:col-span-2 lg:max-w-2xl lg:mx-auto lg:w-full"
                  : ""
              }
            >
              <TeamMemberCard member={member} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
