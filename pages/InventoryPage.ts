import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  inventoryItemName: Locator;
  addToCartButton: Locator;
  inventoryItemUrl: string;
  cartIcon: Locator;
  inventoryUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItemName = page.getByText('Sauce Labs Backpack');
    this.addToCartButton = page.getByText('Add to cart');
    this.inventoryItemUrl = '/inventory-item.html?id=4';
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');

    this.inventoryUrl = '/inventory.html';
  }

  async addFirstProductToCart() {
    await this.addToCartButton.first().click();
  }

  async addSecondProductToCart() {
    await this.addToCartButton.nth(1).click();
  }

  async openCart() {
    await this.cartIcon.click();
  }
}