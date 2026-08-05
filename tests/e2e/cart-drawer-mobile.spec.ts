import { expect, test } from "@playwright/test";

const cartState = {
  state: {
    cart: [
      {
        id: 1,
        name: "Camiseta Arcane Teste",
        price: "R$ 189,90",
        priceNumber: 189.9,
        installments: "ATÉ 12X S/ JUROS OU PIX",
        image: "/hero.png",
        quantity: 2,
        selectedSize: "M",
      },
    ],
    isCartOpen: false,
    cartTotal: 341.82,
    remainingForFreeShipping: 0,
    freeShippingProgress: 100,
    activeCoupon: null,
    discountValue: 0,
    savedCep: "",
    savedShippingCost: null,
  },
  version: 0,
};

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate((state) => {
    sessionStorage.setItem("arcane_modal_seen", "true");
    localStorage.setItem("arcane-cart-storage", JSON.stringify(state));
  }, cartState);
  await page.reload();
  await page.getByRole("button", { name: "Carrinho" }).click();
});

test("coupon and subtotal remain reachable without overlapping the checkout footer", async ({ page }) => {
  const scrollArea = page.getByTestId("cart-scroll-area");
  const summary = page.getByTestId("cart-coupon-summary");
  const footer = page.getByTestId("cart-checkout-footer");

  await scrollArea.evaluate((element) => element.scrollTo({ top: element.scrollHeight }));
  await expect(summary).toBeVisible();
  await expect(page.getByText("Subtotal", { exact: true })).toBeVisible();

  const [summaryBox, footerBox] = await Promise.all([summary.boundingBox(), footer.boundingBox()]);
  expect(summaryBox).not.toBeNull();
  expect(footerBox).not.toBeNull();
  expect((summaryBox?.y ?? 0) + (summaryBox?.height ?? 0)).toBeLessThanOrEqual((footerBox?.y ?? 0) + 1);
});

test("coupon feedback keeps a stable status region and does not cover subtotal", async ({ page }) => {
  const scrollArea = page.getByTestId("cart-scroll-area");
  await scrollArea.evaluate((element) => element.scrollTo({ top: element.scrollHeight }));

  const input = page.getByRole("textbox", { name: "Cupom de desconto" });
  await input.fill("ARCANE5");
  await page.getByRole("button", { name: "APLICAR" }).click();
  await expect(page.getByRole("status")).toContainText("VALIDANDO CUPOM");
  await expect(page.getByRole("status")).toContainText("CUPOM APLICADO COM SUCESSO");
  await expect(page.getByTestId("cart-order-summary")).toBeVisible();
});