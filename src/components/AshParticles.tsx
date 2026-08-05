import { useEffect, useRef } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

export function AshParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      color: string;
      opacity: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = -(Math.random() * 0.5 + 0.2);
        this.speedX = Math.random() * 0.4 - 0.2;
        this.color = Math.random() > 0.5 ? '#450a0a' : '#52525b'; // red-900 or zinc-600
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update(width: number, height: number) {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y < -10) {
          this.y = height + 10;
          this.x = Math.random() * width;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.globalAlpha = this.opacity;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    const init = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-60"
    />
  );
}
