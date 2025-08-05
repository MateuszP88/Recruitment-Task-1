import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

let inventoryPage;
let cartPage;

test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await page.goto(inventoryPage.inventoryUrl)
});

test.afterEach(async ({ page }) => {
    cartPage.clickRemove();
    await expect(cartPage.cartItem).not.toBeVisible();
})

  test('Add to cart and verify cart contents', async ({ page }) => {

    await inventoryPage.addSecondProductToCart();
    await inventoryPage.openCart();

    const cartCount = await cartPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });