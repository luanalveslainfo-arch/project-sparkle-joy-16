import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, CreditCard, Truck, Info, X } from "lucide-react";

interface BadgeProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  ariaLabel: string;
  badgeKey: string;
}

const BadgeItem = ({ icon, label, description, ariaLabel, badgeKey }: BadgeProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const trackEvent = (type: 'hover' | 'click') => {
    // In a real app, this would send data to GA4/Meta Pixel/etc.
    console.log(`[TrustTrack] ${type.toUpperCase()} on ${badgeKey}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showTooltip]);

  return (
    <div className="relative flex items-center justify-between group py-1">
      <div 
        className="flex-1 flex items-center gap-3 text-zinc-500 hover:text-white transition-colors cursor-pointer" 
        aria-label={ariaLabel}
        onMouseEnter={() => {
          setShowTooltip(true);
          trackEvent('hover');
        }}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => {
          setShowTooltip(!showTooltip);
          trackEvent('click');
        }}
      >
        <div className="text-[#8B0000]">
          {icon}
        </div>
        <span className="text-[9px] uppercase tracking-[0.2em] font-bold">{label}</span>
      </div>
      
      <button 
        className="text-zinc-600 hover:text-zinc-400 p-1"
        aria-label={`Mais informações sobre ${label}`}
      >
        <Info size={12} />
      </button>

      {showTooltip && (
        <div 
          ref={tooltipRef}
          className="absolute bottom-full left-0 mb-2 w-64 p-4 bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl z-[11000] animate-in fade-in slide-in-from-bottom-2 ring-1 ring-zinc-800"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-[8px] uppercase tracking-[0.2em] font-black text-[#8B0000]">{label}</span>
            <button onClick={() => setShowTooltip(false)} className="text-zinc-700 hover:text-zinc-500">
              <X size={12} />
            </button>
          </div>
          <p className="text-[9px] text-zinc-400 uppercase leading-relaxed tracking-wider font-medium">
            {description}
          </p>
          <div className="absolute top-full left-4 w-3 h-3 bg-zinc-950 border-r border-b border-zinc-800 rotate-45 -translate-y-1.5" />
        </div>
      )}
    </div>
  );
};

export const TrustBadges = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`grid grid-cols-1 gap-2 ${className}`}>
      <BadgeItem 
        badgeKey="security"
        icon={<ShieldCheck size={14} />}
        label="Compra 100% Segura"
        ariaLabel="Garantia de compra segura com criptografia ponta a ponta"
        description="Utilizamos protocolos SSL de 256 bits. Seus dados de pagamento são processados em ambiente isolado e nunca armazenados em nossos servidores."
      />
      <BadgeItem 
        badgeKey="payment"
        icon={<CreditCard size={14} />}
        label="Até 6x s/ Juros ou PIX"
        ariaLabel="Pagamento parcelado em 6 vezes sem juros ou desconto via PIX"
        description="Parcele em até 6x sem juros no cartão. Pagamentos via PIX possuem 5% de desconto automático calculado no checkout final."
      />
      <BadgeItem 
        badgeKey="shipping"
        icon={<Truck size={14} />}
        label="Entrega via Correios"
        ariaLabel="Entrega garantida através dos Correios com rastreamento total"
        description="Logística prioritária via Correios com seguro total. O código de rastreio é enviado automaticamente para seu e-mail após a postagem."
      />
    </div>
  );
};
