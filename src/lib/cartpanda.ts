// src/lib/cartpanda.ts

export const CARTPANDA_DOMAIN = "arcanestore.mycartpanda.com";

export type ProductSlug = "the-crucible" | "blood-oath" | "shadow-creed";
export type ProductSize = "P" | "M" | "G" | "GG" | "XGG";

export interface CartItemToCheckout {
  slug: string;
  size: string;
  quantity: number;
}

// IDs reais de cada estampa e tamanho cadastrados na sua CartPanda
export const CARTPANDA_VARIANTS: Record<ProductSlug, Record<ProductSize, number>> = {
  "the-crucible": {
    P: 211974829,
    M: 211974830,
    G: 211974831,
    GG: 211974832,
    XGG: 211974833,
  },
  "blood-oath": {
    P: 211974834,
    M: 211974835,
    G: 211974836,
    GG: 211974838,
    XGG: 211974839,
  },
  "shadow-creed": {
    P: 211974837,
    M: 211974842,
    G: 211974841,
    GG: 211974843,
    XGG: 211974840,
  },
};

// Reconhece nomes como "I - SHADOW CREED (PEÇA 1)" ou "BLOOD OATH"
export function normalizeProductSlug(nameOrSlug: string): ProductSlug {
  const lower = (nameOrSlug || "").toLowerCase();
  if (lower.includes("blood")) return "blood-oath";
  if (lower.includes("shadow")) return "shadow-creed";
  return "the-crucible";
}

// Normaliza o tamanho
export function normalizeProductSize(size: string): ProductSize {
  const upper = (size || "M").toUpperCase().trim();
  if (upper === "P" || upper === "M" || upper === "G" || upper === "GG" || upper === "XGG") {
    return upper as ProductSize;
  }
  return "M";
}

/**
 * Monta o checkout da CartPanda com TODOS os itens do carrinho (1, 2, 3 ou mais peças)
 */
export function buildCartpandaCheckoutUrl(
  items: CartItemToCheckout[],
  couponCode?: string
): string | null {
  if (!items || items.length === 0) {
    return null;
  }

  const permalinkItems: string[] = [];

  for (const item of items) {
    const slug = normalizeProductSlug(item.slug);
    const size = normalizeProductSize(item.size);
    const variantId = CARTPANDA_VARIANTS[slug]?.[size];

    if (variantId) {
      const quantity = Math.max(1, item.quantity || 1);
      permalinkItems.push(`${variantId}:${quantity}`);
    } else {
      console.warn(`[CartPanda] Variante não encontrada para ${slug} tamanho ${size}`);
    }
  }

  if (permalinkItems.length === 0) {
    return null;
  }

  // Gera: https://arcanestore.mycartpanda.com/checkout/211974843:1,211974838:1
  let url = `https://${CARTPANDA_DOMAIN}/checkout/${permalinkItems.join(",")}`;

  if (couponCode && couponCode.trim() !== "") {
    url += `?coupon=${encodeURIComponent(couponCode.trim())}`;
  }

  return url;
}