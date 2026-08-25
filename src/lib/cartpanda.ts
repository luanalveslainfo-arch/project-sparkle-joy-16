// src/lib/cartpanda.ts

export const CARTPANDA_DOMAIN = "arcanestore.mycartpanda.com";

export type ProductSlug = "shadow-creed" | "blood-oath" | "the-crucible";
export type ProductSize = "P" | "M" | "G" | "GG" | "XGG";

export interface CartItemToCheckout {
  slug: string;
  size: string;
  quantity: number;
}

// Mapeamento explícito das variantes da CartPanda
export const CARTPANDA_VARIANTS: Record<string, Record<string, number>> = {
  "shadow-creed": {
    P: 211974837,
    M: 211974842,
    G: 211974841,
    GG: 211974843,
    XGG: 211974840,
  },
  "blood-oath": {
    P: 211974834,
    M: 211974835,
    G: 211974836,
    GG: 211974838,
    XGG: 211974839,
  },
  "the-crucible": {
    P: 211974829,
    M: 211974830,
    G: 211974831,
    GG: 211974832,
    XGG: 211974833,
  },
};

// Normalizador de slug caso venha com nomes como "DROP 001 | THE CRUCIBLE"
export function normalizeProductSlug(nameOrSlug: string): string {
  const lower = nameOrSlug.toLowerCase();
  if (lower.includes("shadow")) return "shadow-creed";
  if (lower.includes("blood")) return "blood-oath";
  if (lower.includes("crucible")) return "the-crucible";
  return lower;
}

/**
 * Constrói a URL do checkout da CartPanda a partir dos itens do carrinho
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
    const size = item.size.toUpperCase().trim();
    
    const productVariants = CARTPANDA_VARIANTS[slug];
    if (!productVariants) {
      console.error(`[CartPanda] Produto não encontrado: ${item.slug} (${slug})`);
      continue;
    }

    const variantId = productVariants[size];
    if (!variantId) {
      console.error(`[CartPanda] Tamanho ${size} inválido para ${slug}`);
      continue;
    }

    const quantity = Math.max(1, item.quantity || 1);
    permalinkItems.push(`${variantId}:${quantity}`);
  }

  if (permalinkItems.length === 0) {
    return null;
  }

  let url = `https://${CARTPANDA_DOMAIN}/cart/${permalinkItems.join(",")}`;

  if (couponCode && couponCode.trim() !== "") {
    url += `?coupon=${encodeURIComponent(couponCode.trim())}`;
  }

  return url;
}