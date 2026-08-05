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
          <div className="relative w-full aspect-[3/4] bg-zinc-950 flex items-center justify-center overflow-hidden mb-4 shadow-xl transition-shadow duration-300 group-hover:shadow-[0_10px_25px_rgba(185,28,28,0.2)]">
            <motion.img 
              src={product.image} 
              alt={product.name} 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              className="w-full h-full object-cover brightness-75 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
          
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-zinc-300">{product.name}</h4>
            <span className="text-base font-semibold text-white">{product.price}</span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
