import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  checkoutButton: Locator;
  removeButton: Locator;
  cartItem: Locator;
  cartUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByText('Checkout');
    this.removeButton = page.getByText('Remove');
    this.cartItem = page.locator('.cart_item');

    this.cartUrl = '/cart.html';
  }

  async getCartItemCount() {
    return this.cartItem.count();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async clickRemove() {
    await this.removeButton.click();
  }
}