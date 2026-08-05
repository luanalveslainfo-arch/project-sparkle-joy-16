import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CrimsonBloodTracking({ mouseX, mouseY, isNearEdge }: { mouseX: number; mouseY: number; isNearEdge: boolean }) {
  const [drops, setDrops] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (isNearEdge) {
      const id = Date.now();
      const newDrop = {
        id,
        x: mouseX,
        y: mouseY,
      };
      setDrops((prev) => [...prev.slice(-10), newDrop]);
      
      const timer = setTimeout(() => {
        setDrops((prev) => prev.filter((d) => d.id !== id));
      }, 2000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isNearEdge, mouseX, mouseY]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Fluid Tracking Light */}
      <div 
        className="absolute w-[150px] h-[150px] rounded-full blur-[60px] opacity-40 transition-opacity duration-500"
        style={{
          left: mouseX,
          top: mouseY,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, #dc2626 0%, #7f1d1d 70%, transparent 100%)',
        }}
      />

      {/* Blood Drops */}
      <AnimatePresence>
        {drops.map((drop) => (
          <motion.div
            key={drop.id}
            initial={{ opacity: 0.8, scale: 1, y: 0 }}
            animate={{ 
              opacity: 0, 
              y: 40,
              scale: 0.5
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="absolute w-1.5 h-1.5 bg-red-800 rounded-full"
            style={{
              left: drop.x,
              top: drop.y,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
