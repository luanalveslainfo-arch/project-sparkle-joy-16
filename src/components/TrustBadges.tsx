import React, { useState } from 'react';
import { ShieldCheck, CreditCard, Truck, Info, X } from "lucide-react";

interface BadgeProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  ariaLabel: string;
}

const BadgeItem = ({ icon, label, description, ariaLabel }: BadgeProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex items-center justify-between group py-1">
      <div className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors cursor-default" aria-label={ariaLabel}>
        <div className="text-[#8B0000]">
          {icon}
        </div>
        <span className="text-[9px] uppercase tracking-[0.2em] font-bold">{label}</span>
      </div>
      
      <button 
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="text-zinc-600 hover:text-zinc-400 p-1"
        aria-label={`Mais informações sobre ${label}`}
      >
        <Info size={12} />
      </button>

      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-zinc-900 border border-zinc-800 rounded shadow-2xl z-[11000] animate-in fade-in slide-in-from-bottom-1">
          <div className="flex justify-between items-start mb-1">
            <span className="text-[8px] uppercase tracking-widest font-bold text-[#8B0000]">{label}</span>
            <X size={10} className="text-zinc-600 md:hidden" onClick={() => setShowTooltip(false)} />
          </div>
          <p className="text-[9px] text-zinc-400 uppercase leading-relaxed tracking-wider">
            {description}
          </p>
          <div className="absolute top-full left-4 border-8 border-transparent border-t-zinc-900" />
        </div>
      )}
    </div>
  );
};

export const TrustBadges = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`grid grid-cols-1 gap-1 ${className}`}>
      <BadgeItem 
        icon={<ShieldCheck size={14} />}
        label="Compra 100% Segura"
        ariaLabel="Garantia de compra segura com criptografia ponta a ponta"
        description="Utilizamos os mais avançados protocolos de segurança. Seus dados são criptografados e nunca armazenados em nossos servidores."
      />
      <BadgeItem 
        icon={<CreditCard size={14} />}
        label="Até 12x s/ Juros ou PIX"
        ariaLabel="Pagamento parcelado em 12 vezes sem juros ou desconto via PIX"
        description="Parcele suas armaduras em até 12x sem juros no cartão ou aproveite 5% de desconto imediato em pagamentos via PIX."
      />
      <BadgeItem 
        icon={<Truck size={14} />}
        label="Entrega via Correios"
        ariaLabel="Entrega garantida através dos Correios com rastreamento total"
        description="Envio expresso para todo o território nacional. Rastreamento em tempo real desde a postagem até a entrega no seu arsenal."
      />
    </div>
  );
};
