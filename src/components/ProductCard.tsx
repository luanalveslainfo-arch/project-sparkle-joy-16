import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Product } from '@/lib/products-data';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasAutoplayed, setHasAutoplayed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Autoplay effect: swap images once when in view
  useEffect(() => {
    if (!product.backImage || hasAutoplayed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          setTimeout(() => {
            setCurrentImageIndex(1);
            setTimeout(() => {
              setCurrentImageIndex(0);
              setHasAutoplayed(true);
            }, 2000);
          }, 1500);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [product.backImage, hasAutoplayed]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !product.backImage) return;
    
    const touchEndX = e.changedTouches[0]?.clientX;
    if (touchEndX === undefined) return;
    const diff = touchStartX.current - touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left -> Next image
        setCurrentImageIndex(Math.min(currentImageIndex + 1, 1));
      } else {
        // Swipe right -> Prev image
        setCurrentImageIndex(Math.max(currentImageIndex - 1, 0));
      }
    }
    touchStartX.current = null;
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col"
    >
      <Link
        to="/produto/$productId"
        params={{ productId: product.id.toString() }}
        className="relative w-full aspect-[3/4] bg-zinc-950 overflow-hidden border border-white/5 transition-all duration-700 hover:border-white/20 active:scale-[0.98] tap-highlight-transparent"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Desktop Images */}
        <div className="hidden md:block absolute inset-0">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
          />
          {product.backImage && (
            <img
              src={product.backImage}
              alt={`${product.name} back`}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-105"
            />
          )}
        </div>

        {/* Mobile Swipe Images */}
        <div className="md:hidden absolute inset-0 flex transition-transform duration-500 ease-out z-0" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>

          <div className="min-w-full h-full relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.backImage && (
            <div className="min-w-full h-full relative">
              <img
                src={product.backImage}
                alt={`${product.name} back`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Mobile Indicators */}
        {product.backImage && (
          <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {[0, 1].map((idx) => (
              <div
                key={idx}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  currentImageIndex === idx ? 'bg-white scale-125' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}

        {/* Interaction Hint (Mobile Only) */}
        {product.backImage && (
          <div className="md:hidden absolute top-4 right-4 z-20">
            <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[8px] font-bold tracking-widest text-zinc-300 uppercase flex items-center gap-1.5 animate-pulse">
              <span className="text-[10px]">↔</span> 2 imagens
            </div>
          </div>
        )}

        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden md:block">
          <div className="bg-white text-black px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
            Ver detalhes <ChevronRight size={10} />
          </div>
        </div>
      </Link>

      <div className="mt-8 space-y-3">
        <h3 className="font-madness text-2xl text-white">{product.name}</h3>
        <p className="text-zinc-500 text-[9px] tracking-[0.3em] uppercase">{product.category}</p>
        <p className="text-white text-xs font-bold tracking-widest">{product.price}</p>
      </div>
    </motion.div>
  );
}
