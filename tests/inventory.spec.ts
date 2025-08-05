import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

let inventoryPage;

test.beforeEach(async ({page}) => {
    inventoryPage = new InventoryPage(page);
    await page.goto(inventoryPage.inventoryUrl)
});

test('Clicking on the product should open product page', async ({ page }) => {
    await inventoryPage.inventoryItemName.click();
    await expect(page).toHaveURL(inventoryPage.inventoryItemUrl);
    await expect(inventoryPage.inventoryItemName).toBeVisible();
});