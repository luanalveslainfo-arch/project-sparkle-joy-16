// src/lib/cartpanda.ts

export type ProductSlug = "the-crucible" | "blood-oath" | "shadow-creed";
export type ProductSize = "P" | "M" | "G" | "GG" | "XGG";

export interface CartItemToCheckout {
  slug: string;
  size: string;
  quantity: number;
}

// Mapa Oficial de Checkout Links da Arcane Store (CartPanda Link Bundler)
export const CARTPANDA_LINKS: Record<ProductSlug, Record<ProductSize, string>> = {
  "the-crucible": {
    P: "https://arcanestore.mycartpanda.com/ckt/JDYAVj",
    M: "https://arcanestore.mycartpanda.com/ckt/P9Aen3",
    G: "https://arcanestore.mycartpanda.com/ckt/rrbvOJ",
    GG: "https://arcanestore.mycartpanda.com/ckt/NwPD24",
    XGG: "https://arcanestore.mycartpanda.com/ckt/yrPxA7",
  },
  "blood-oath": {
    P: "https://arcanestore.mycartpanda.com/ckt/mrJ6D3",
    M: "https://arcanestore.mycartpanda.com/ckt/9Qd79d",
    G: "https://arcanestore.mycartpanda.com/ckt/nr45vY",
    GG: "https://arcanestore.mycartpanda.com/ckt/e6ZmBO",
    XGG: "https://arcanestore.mycartpanda.com/ckt/RVDLe7",
  },
  "shadow-creed": {
    P: "https://arcanestore.mycartpanda.com/ckt/K6wnzo",
    M: "https://arcanestore.mycartpanda.com/ckt/WeWBJL",
    G: "https://arcanestore.mycartpanda.com/ckt/QnGqe7",
    GG: "https://arcanestore.mycartpanda.com/ckt/jrVwxn",
    XGG: "https://arcanestore.mycartpanda.com/ckt/gYkgLQ",
  },
};

// Normalizador de estampa/produto
export function normalizeProductSlug(nameOrSlug: string): ProductSlug {
  const lower = nameOrSlug.toLowerCase();
  if (lower.includes("blood")) return "blood-oath";
  if (lower.includes("shadow")) return "shadow-creed";
  return "the-crucible";
}

// Normalizador de tamanho
export function normalizeProductSize(size: string): ProductSize {
  const upper = (size || "M").toUpperCase().trim();
  if (upper === "P" || upper === "M" || upper === "G" || upper === "GG" || upper === "XGG") {
    return upper as ProductSize;
  }
  return "M";
}

/**
 * Retorna o link de checkout correto para o produto e aplica o cupom se existir
 */
export function buildCartpandaCheckoutUrl(
  items: CartItemToCheckout[],
  couponCode?: string
): string | null {
  if (!items || items.length === 0) {
    return null;
  }

  // Pega o item principal do carrinho
  const primaryItem = items[0];
  const slug = normalizeProductSlug(primaryItem.slug);
  const size = normalizeProductSize(primaryItem.size);

  let targetUrl = CARTPANDA_LINKS[slug]?.[size];

  if (!targetUrl) {
    // Fallback de segurança para Crucible M
    targetUrl = CARTPANDA_LINKS["the-crucible"]["M"];
  }

  // Anexa cupom de desconto se houver
  if (couponCode && couponCode.trim() !== "") {
    targetUrl += `?coupon=${encodeURIComponent(couponCode.trim())}`;
  }

  return targetUrl;
}