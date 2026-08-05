import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export function InteractiveGrid({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(139, 0, 0, 0.1),
      transparent 80%
    )
  `;

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{ background }}
      />
      {children}
    </div>
  );
}
