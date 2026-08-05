import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10"
    >
      <Link 
        to="/produto/$productId" 
        params={{ productId: product.id.toString() }} 
        className="block cursor-pointer relative z-10 pointer-events-auto"
      >
        <motion.div 
          whileHover={{ 
            y: -8,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className="group flex flex-col items-start text-left relative z-10"
        >
          <div className="relative w-full aspect-[3/4] bg-zinc-950 flex items-center justify-center overflow-hidden mb-4 shadow-xl transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(139,0,0,0.15)] group-hover:border-zinc-800 border border-transparent">
            <motion.img 
              src={product.image} 
              alt={product.name} 
              width="300"
              height="400"
              loading="lazy"
              decoding="async"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              className="w-full h-full object-cover brightness-75 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
          
          <div className="flex flex-col gap-1">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">{product.name}</h4>
            <span className="text-sm font-black text-white tracking-widest">{product.price}</span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
