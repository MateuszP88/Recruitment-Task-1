import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { checkoutInfo } from '../data/testData';

let inventoryPage;
let cartPage;
let checkoutPage;

test.beforeEach(async ({ page }) => {
    inventoryPage  = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await page.goto(inventoryPage.inventoryUrl);
})


test('Complete checkout process', async ({ page }) => {
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.openCart();

    await expect(page).toHaveURL(cartPage.cartUrl);

    await cartPage.clickCheckout();

    await expect(page).toHaveURL(checkoutPage.checkoutFirstStepUrl);
    await expect(checkoutPage.firstStepPageTitle).toBeVisible();

    await checkoutPage.fillCheckoutInfoAndContinue(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.postalCode);

    await expect(page).toHaveURL(checkoutPage.checkoutSecondStepUrl);
    await expect(checkoutPage.secondStepPageTitle).toBeVisible();

    await checkoutPage.finishCheckout();

    await expect(page).toHaveURL(checkoutPage.checkoutCompleteUrl)
    await expect(await checkoutPage.getConfirmationMessage()).toHaveText('Thank you for your order!');
  });