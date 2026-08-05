import { createFileRoute } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu, Mail, Instagram, Twitter, X, Phone, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const products = {
    arcane: [
      { id: 1, name: "COMPRESSION VEIN", price: "R$ 189,90", installments: "12x de R$ 15,82", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?q=80&w=800" },
      { id: 2, name: "ANGELIC BLADE", price: "R$ 179,90", installments: "12x de R$ 14,99", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800" }
    ],
    oversized: [
      { id: 3, name: "GOTHIC CROSS", price: "R$ 159,90", installments: "12x de R$ 13,32", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800" },
      { id: 4, name: "FALLEN ANGEL", price: "R$ 165,90", installments: "12x de R$ 13,82", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800" }
    ],
    sweatshirts: [
      { id: 5, name: "ZIP-UP GOTHIC", price: "R$ 289,90", installments: "12x de R$ 24,15", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800" },
      { id: 6, name: "TRIBAL BAGGY", price: "R$ 219,90", installments: "12x de R$ 18,32", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800" }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Discount Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative bg-[#0a0a0a] border border-red-900/30 p-8 max-w-md w-full text-center shadow-2xl shadow-red-900/10">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
              <X size={20} />
            </button>
            <h2 className="text-3xl mb-4 font-serif text-red-700" style={{ fontFamily: "'UnifrakturMaguntia', serif" }}>Oferta Arcano</h2>
            <p className="text-xl mb-6">Ganhe <span className="text-red-600 font-bold">5% OFF</span> na sua primeira compra.</p>
            <button className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-3 transition-colors shadow-lg shadow-red-900/20">
              RESGATAR CUPOM
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Menu className="cursor-pointer md:hidden" />
          <nav className="hidden md:flex gap-6 text-xs uppercase tracking-widest text-zinc-400">
            <a href="#" className="hover:text-red-700 transition-colors">Home</a>
            <a href="#" className="hover:text-red-700 transition-colors">Produtos</a>
            <a href="#" className="hover:text-red-700 transition-colors">Tabela de Medidas</a>
            <a href="#" className="hover:text-red-700 transition-colors">Contato</a>
          </nav>
        </div>
        <h1 className="text-4xl absolute left-1/2 -translate-x-1/2" style={{ fontFamily: "'UnifrakturMaguntia', serif" }}>ARCANE</h1>
        <div className="flex items-center gap-5">
          <Search className="cursor-pointer text-zinc-400 hover:text-white w-5" />
          <User className="cursor-pointer text-zinc-400 hover:text-white w-5" />
          <ShoppingBag className="cursor-pointer text-zinc-400 hover:text-white w-5" />
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=2000')] bg-cover bg-center brightness-[0.3] scale-110 animate-pulse duration-[10s]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
        <div className="relative text-center z-10 px-4">
          <h2 className="text-6xl md:text-[10rem] uppercase tracking-tighter leading-none mb-4" style={{ fontFamily: "'UnifrakturMaguntia', serif" }}>
            MEMENTO <br /> <span className="text-red-800">MORI</span>
          </h2>
          <p className="text-zinc-500 tracking-[0.3em] uppercase text-sm md:text-base">Streetwear Essentials for the Fallen</p>
        </div>
      </section>

      {/* Product Sections */}
      <main className="container mx-auto px-4 py-24 space-y-32">
        
        {/* Drop Arcano */}
        <section>
          <div className="flex items-center justify-between mb-12 border-b border-red-900/20 pb-4">
            <h3 className="text-3xl uppercase tracking-widest" style={{ fontFamily: "'UnifrakturMaguntia', serif" }}>Drop Arcano</h3>
            <a href="#" className="text-xs text-red-700 hover:text-red-500 uppercase tracking-widest transition-colors">Ver tudo</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {products.arcane.map((p) => <ProductCard key={p.id} {...p} />)}
          </div>
        </section>

        {/* Oversized */}
        <section>
          <div className="flex items-center justify-between mb-12 border-b border-red-900/20 pb-4">
            <h3 className="text-3xl uppercase tracking-widest" style={{ fontFamily: "'UnifrakturMaguntia', serif" }}>Camisas Oversized</h3>
            <a href="#" className="text-xs text-red-700 hover:text-red-500 uppercase tracking-widest transition-colors">Ver tudo</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {products.oversized.map((p) => <ProductCard key={p.id} {...p} />)}
          </div>
        </section>

        {/* Sweatshirts */}
        <section>
          <div className="flex items-center justify-between mb-12 border-b border-red-900/20 pb-4">
            <h3 className="text-3xl uppercase tracking-widest" style={{ fontFamily: "'UnifrakturMaguntia', serif" }}>Moletons e Calças</h3>
            <a href="#" className="text-xs text-red-700 hover:text-red-500 uppercase tracking-widest transition-colors">Ver tudo</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {products.sweatshirts.map((p) => <ProductCard key={p.id} {...p} />)}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 py-24 mt-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ fontFamily: "'UnifrakturMaguntia', serif" }}>Join the Coven</h4>
            <p className="text-zinc-500 text-sm mb-6">Assine nossa newsletter e receba drops exclusivos.</p>
            <div className="flex group">
              <input type="email" placeholder="Seu email" className="bg-black border border-white/10 px-4 py-3 w-full focus:outline-none focus:border-red-900 transition-colors text-sm" />
              <button className="bg-red-800 hover:bg-red-700 px-6 transition-colors">
                <Mail size={18} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-300">Explorar</h4>
              <ul className="text-zinc-500 text-xs space-y-4 uppercase tracking-tighter">
                <li><a href="#" className="hover:text-red-700 transition-colors">Drops</a></li>
                <li><a href="#" className="hover:text-red-700 transition-colors">Acessórios</a></li>
                <li><a href="#" className="hover:text-red-700 transition-colors">Outlet</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-300">Ajuda</h4>
              <ul className="text-zinc-500 text-xs space-y-4 uppercase tracking-tighter">
                <li><a href="#" className="hover:text-red-700 transition-colors">Envios</a></li>
                <li><a href="#" className="hover:text-red-700 transition-colors">Trocas</a></li>
                <li><a href="#" className="hover:text-red-700 transition-colors">Rastreio</a></li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-300">Contato</h4>
            <div className="space-y-4 text-zinc-500 text-sm">
              <p className="flex items-center gap-3 hover:text-red-700 cursor-pointer transition-colors"><MessageSquare size={16} /> WhatsApp: (11) 99999-9999</p>
              <p className="flex items-center gap-3 hover:text-red-700 cursor-pointer transition-colors"><Mail size={16} /> contato@arcane.com</p>
              <div className="flex gap-6 pt-4">
                <Instagram className="cursor-pointer hover:text-red-700 transition-colors" />
                <Twitter className="cursor-pointer hover:text-red-700 transition-colors" />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-24 pt-8 border-t border-white/5 text-center">
          <p className="text-zinc-700 text-[10px] uppercase tracking-[0.5em]">© 2026 ARCANE CLOTHING - BEYOND THE SHADOWS</p>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ name, price, installments, image }: { name: string, price: string, installments: string, image: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a0a] mb-6">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-75 grayscale hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <button className="absolute bottom-0 left-0 w-full bg-red-800 text-white py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-bold text-xs tracking-widest">
          ADICIONAR AO CARRINHO
        </button>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-bold uppercase tracking-widest group-hover:text-red-700 transition-colors">{name}</h4>
        <p className="text-red-700 font-bold">{price}</p>
        <p className="text-zinc-600 text-[10px] uppercase tracking-wider">{installments}</p>
      </div>
    </div>
  );
}
