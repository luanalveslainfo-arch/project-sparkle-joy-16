import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import { CrimsonBloodTracking } from "./CrimsonBloodTracking";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

export function ProductCard({ product }: { product: Product }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isNearEdge, setIsNearEdge] = useState(false);
  
  // Tilt 3D Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 100 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 100 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;
    
    setMousePos({ x: relativeX, y: relativeY });

    // Edge collision detection (25px threshold)
    const threshold = 25;
    const near = 
      relativeX < threshold || 
      relativeX > rect.width - threshold || 
      relativeY < threshold || 
      relativeY > rect.height - threshold;
    
    setIsNearEdge(near);

    if (isMobile) return;
    const xPct = relativeX / rect.width - 0.5;
    const yPct = relativeY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsNearEdge(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative z-10 group rounded-sm border transition-all duration-300 ${
        isNearEdge 
          ? "border-red-600/80 shadow-[0_0_15px_rgba(220,38,38,0.5)]" 
          : "border-zinc-800"
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
    >
      <CrimsonBloodTracking 
        mouseX={mousePos.x} 
        mouseY={mousePos.y} 
        isNearEdge={!isMobile && isNearEdge} 
      />

      <Link 
        to="/produto/$productId" 
        params={{ productId: product.id.toString() }} 
        className="block cursor-pointer relative z-10 pointer-events-auto"
      >
        <div className="group flex flex-col items-start text-left relative z-10 transition-all duration-300 p-0">
          <div 
            className="relative w-full aspect-[3/4] bg-transparent flex items-center justify-center overflow-hidden mb-4 shadow-xl transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(139,0,0,0.15)]"
            style={{ 
              transform: isMobile ? "none" : "translateZ(20px)",
              transformStyle: "preserve-3d" 
            }}
          >
            <motion.img 
              src={product.image} 
              alt={product.name} 
              width="300"
              height="400"
              loading="lazy"
              decoding="async"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              className="w-full h-full object-cover brightness-75 transition-all duration-700 mix-blend-lighten" 
              style={{ transform: isMobile ? "none" : "translateZ(30px)" }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
          
          <div className="flex flex-col gap-1 p-4 pt-0" style={{ transform: isMobile ? "none" : "translateZ(40px)" }}>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">{product.name}</h4>
            <span className="text-sm font-black text-white tracking-widest">{product.price}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
