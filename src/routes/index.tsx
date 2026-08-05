import { createFileRoute } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu, Mail, Instagram, Twitter } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/90 border-b border-white/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <Menu className="cursor-pointer" />
          <Search className="cursor-pointer" />
        </div>
        <h1 className="text-2xl font-serif tracking-tighter">ARCANE</h1>
        <div className="flex items-center gap-4 text-sm">
          <User className="cursor-pointer" />
          <ShoppingBag className="cursor-pointer" />
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541532740271-44751131b054?q=80&w=2000')] bg-cover bg-center brightness-50" />
        <h2 className="relative text-6xl md:text-9xl font-serif uppercase tracking-widest text-center">
          DARK <br /> <span className="text-red-900">FITNESS</span>
        </h2>
      </section>

      {/* Collections */}
      <main className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-serif uppercase mb-12 text-center border-b border-red-900 pb-4">Drop Arcano</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="group border border-white/10 hover:border-red-900 transition-colors p-4">
              <div className="bg-zinc-900 h-64 mb-4 flex items-center justify-center text-zinc-500">Imagem</div>
              <h4 className="font-bold text-lg">CAMISA OVERSIZED</h4>
              <p className="text-sm text-zinc-400">R$ 159,90</p>
              <p className="text-xs text-zinc-600">12x de R$ 17,07</p>
              <button className="w-full mt-4 bg-red-950 text-white py-2 hover:bg-red-800 transition-colors">COMPRAR</button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-white/10 py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-serif text-xl mb-4">NEWSLETTER</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Seu email" className="bg-black border border-white/20 p-2 w-full" />
              <button className="bg-red-950 px-4">OK</button>
            </div>
          </div>
          <div className="flex gap-4 items-end">
            <Instagram />
            <Twitter />
            <Mail />
          </div>
          <p className="text-zinc-600 text-sm">© 2026 ARCANE - ESTÉTICA GÓTICA</p>
        </div>
      </footer>
    </div>
  );
}
